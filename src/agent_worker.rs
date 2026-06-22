use crate::bus::Message;
use std::sync::mpsc::Receiver;

pub struct AgentWorker {
    pub name: String,
}

impl AgentWorker {
    pub fn new(name: &str) -> Self {
        Self { name: name.to_string() }
    }

    pub fn listen(&self, rx: &Receiver<Message>) {
        println!(">> [Agent: {}] في وضع الاستعداد...", self.name);
        for msg in rx {
            if msg.to == self.name || msg.to == "ALL" {
                println!(">> [Agent: {}] استلمت أمراً: {}", self.name, msg.content);
                // هنا سيأتي لاحقاً كود تنفيذ المهمة الفعلية
            }
        }
    }
}
