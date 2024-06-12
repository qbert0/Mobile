from typing import List
import os

from fastapi import FastAPI
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain import hub
from langchain.agents import create_openai_functions_agent
from langchain.agents import AgentExecutor
from langchain.pydantic_v1 import BaseModel, Field
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langserve import add_routes
from langchain_core.documents import Document
from fastapi.middleware.cors import CORSMiddleware
from langserve import RemoteRunnable

from fastapi import FastAPI, File, UploadFile, Form, Body
from fastapi.responses import Response



os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "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"
os.environ['OPENAI_API_KEY'] = 'sk-proj-NMCuvXhSyL81HMWOXa40T3BlbkFJ9nlZWfnPHsrtwiLs5bLF'
os.environ['TAVILY_API_KEY'] = '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'
# 1. Load Retriever
file_path = "test.txt"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()  
docs = [Document(page_content=content)]
text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)
embeddings = OpenAIEmbeddings()
vector = FAISS.from_documents(documents, embeddings)
retriever = vector.as_retriever()

# 2. Create tools
retriever_tool = create_retriever_tool(
    retriever,
    "langsmith_search",
    "Search for imformation about information of hospital and doctor. For any questions about hospital, you must use this tool !"
)

search = TavilySearchResults()
tools = [retriever_tool, search]

# 3. Create Agent
prompt = hub.pull("hwchase17/openai-functions-agent")
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 4. Create FastAPI app
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


# 5. Add routes
class Input(BaseModel):
    input: str
    chat_history: List[BaseMessage] = Field(
        ...
    )

class Output(BaseModel):
    output: str

add_routes(
    app,
    agent_executor.with_types(input_type=Input, output_type=Output),
    path="/agent"
)

@app.post("/chat/")
def chat(input_text: str = Form(...)):
    remote_chain = RemoteRunnable("http://192.168.1.2:8000/agent/")
    response = remote_chain.invoke({
        "input": input_text,  # Corrected variable name
        "chat_history": []
    })
    return response




# if __name__ == "__main__":
#     import os
#     os.system("uvicorn server:app --host=192.168.1.2 --port=8080 --reload")




# print(response["output"])