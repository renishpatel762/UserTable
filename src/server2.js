const express = require('express');
const EventSource = require('eventsource');

const app =express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server2 is running 🚀 on ${port}`);
});

const eventSource = new EventSource("http://localhost:3000/comments");

eventSource.onopen = () => {
    console.log('SSE connection opened');
}

eventSource.onmessage = (event) => {
    console.log("Received event", JSON.parse(event.data));
}

eventSource.onerror = () => {
    console.log("SSE connection error.");
    eventSource.close();
}

