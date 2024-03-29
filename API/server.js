import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();
app.use(cors())


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabaseUrl = 'https://snwjzonusggqqymhbluj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0"
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/products', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
    res.send(data);
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});