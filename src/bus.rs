use std::sync::mpsc::{channel, Sender, Receiver};

pub struct Message {
    pub from: String,
    pub to: String,
    pub content: String,
}

pub struct Bus {
    pub sender: Sender<Message>,
    pub receiver: Receiver<Message>,
}

impl Bus {
    pub fn new() -> Self {
        let (tx, rx) = channel();
        Self { sender: tx, receiver: rx }
    }
}
