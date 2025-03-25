import express,{Request, Response} from 'express';

const app =express();
const port = process.env.PORT || 3000;

app.get('/comments/video/:id',(req:Request,res:Response)=>{
    console.log('new request',req);
    
    //set res header to keep connection alive
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('connection','keep-alive');

    // immediately flush headers so client can start processing events
    res.flushHeaders();
    
    //Function to send an event with current time
    const sendEvent = () => {
        const data = {
            time: new Date().toISOString()
        };
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    //send an event every second 
    const intervalId = setInterval(sendEvent,1000);

    //clean up when the client disconnecs
    req.on('close',()=>{
        clearInterval(intervalId);
        res.end();
    });
})

app.listen(port, () => {
    console.log(`Server is running 🚀 on ${port}`);
});
