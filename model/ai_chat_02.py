import os
import uvicorn
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
from langchain import hub
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.memory import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from supabase import create_client, Client
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.tools.retriever import create_retriever_tool
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.runnables import RunnablePassthrough
from langchain.chains import create_retrieval_chain
from langchain_core.messages import HumanMessage, AIMessage

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Form, Body


app = FastAPI(
    title="Langchain API",
    description="API for Langchain",
    version="0.1"
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)



os.environ['OPENAI_API_KEY'] = 'sk-proj-H8O4QtCpj0K6FBF2bU0ZT3BlbkFJExFddD8CM7MyKRm8Qfj8'
llm = ChatOpenAI(model="gpt-3.5-turbo")
embedding = OpenAIEmbeddings()

os.environ['SUPABASE_URL'] = 'https://snwjzonusggqqymhbluj.supabase.co'
os.environ['SUPABASE_KEY'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# getDoctorBySpecialty_name
system_prompt = """
Bạn là nhân viên bệnh viện, hãy hỗ trợ nhiệt tình giúp bệnh nhân \
sau mỗi câu trả lời, hỏi chúc bệnh nhân mau khỏe \
"""

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad")
    ]
)

# retriever_tool
@tool
def retriever_tool(question):
    """
   Reply when the patient asks about any information related to the hospital, such as: consultation hours, 
   consultation rules, how to register for a consultation, staff, and hospital policies, 
   such as discount policies, registration regulations, and procedures during consultations. 
   For example, "Do I get a discount?", "Do I need to...?", "Am I required to...?" """
    q_a_content = supabase.table("Chat_chat").select("content").execute()
    print("q_a_content", q_a_content)
    q_a_content = str(q_a_content.data)
    docs_content = [Document(page_content=q_a_content)]

    file_paths = ["test.txt", "test_02.txt"]
    for file_path in file_paths:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        docs_content.append(Document(page_content=content))

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
    documents = text_splitter.split_documents(docs_content)
    vector = FAISS.from_documents(documents, embedding)
    retriever = vector.as_retriever()

    system_prompt = """
    Bạn là nhân viên bệnh viện, hãy trả lời câu hỏi của bệnh nhân dựa vào context:
    context chứa dữ liệu về các câu hỏi và câu trả lời có dạng như sau:
    các câu hỏi sẽ năm trong mảng question, các câu trả lời sẽ nằm trong mảng z_answer theo sau đó
    một cặp câu hỏi và câu trả lời tương ứng sẽ cùng nằm trong một cặp dấu ngoặc nhọn
    ví dụ như sau:
    {{
            {{
            "question": ["câu hỏi x" ],
            "z_answer": ["câu trả lời cho câu hỏi x" ],
        }},
    }}
    thỉnh thoảng hãy xin lỗi vì trả lời chậm trễ
    nếu không thông tin về câu trả lời, hãy nói bệnh nhân chờ, câu hỏi sẽ được chuyển đến nhân viên đang trực
    <context>
    {context}
    </context>
    """
    q_a_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )

    document_chain = create_stuff_documents_chain(llm, q_a_prompt)
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    response = retrieval_chain.invoke(
        {
            "input": question,
        }
    )

    return response


@tool
# chi chay 1 lan ?
def getDoctorBySpecialtyName(symptom: str):
    """Get doctor information (name, price, rating, specialty_name) by symptom"""
    specialty = supabase.table("Specialty_chat").select("specialty_name").execute()
    symptom_to_specialty_name_prompt = ChatPromptTemplate.from_messages(
        [
           ("system", "dựa vào symptom của bệnh nhân, hãy chọn 1 trong các specialty sau, in ra duy nhất tên specialty, không in thêm bất cứ gì: \
            <specialty> \
            {specialty} \
            </specialty>"),
            ("human", "{symptom}")
        ]
    )
    get_specialty_name_chain = symptom_to_specialty_name_prompt | llm | StrOutputParser()
    specialty_name = get_specialty_name_chain.invoke(
        {"symptom": symptom,
         "specialty": specialty},
    )   
    doctors = supabase.table("Specialty_chat").select("specialty_name, Doctor_chat(*)").eq("specialty_name", specialty_name).execute()
    return doctors
chat_history = ChatMessageHistory()

tools = [getDoctorBySpecialtyName, retriever_tool]
agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, return_intermediate_steps=True)

@app.post("/test/")
def parse_retriever_input(chain_input: str = Form(...), user_id: str = Form(...)):

    stored_messages = chain_input
    response = agent_executor.invoke(
        {"input": stored_messages,
            "chat_history": chat_history.messages
        },
        {"configurable": {"session_id": "user_1"}},
    )
    chat_history.add_user_message(response["input"])
    chat_history.add_ai_message(response['output'])

    content = {
        "question": [
            response["input"]
        ],
        "z_answer": [
            response["output"]
        ]
    }
    data, count = supabase.table("Chat_chat").insert({"content": content, "user_id": user_id}).execute()

    # chat_history.add_user_message(chain_input)
    # print("chat_history", chat_history)

    return response     #params["messages"] bi loi

agent_chain = (
    RunnablePassthrough.assign(context= parse_retriever_input)
) 

chain_with_chat_history = RunnableWithMessageHistory(
    agent_chain,
    lambda session_id: chat_history,
    input_messages_key="input",
    history_messages_key="chat_history"
)

# while True:
#     user_input = input("User: ")
#     response = agent_chain.invoke(
#         {
#             "input": user_input,
#         },
#         {"configurable": {"session_id": "user_1"}},
#     )
#     print(response)


if __name__ == "__main__":
    uvicorn.run("ai_chat_02:app", host="0.0.0.0", port=8000, reload=True)