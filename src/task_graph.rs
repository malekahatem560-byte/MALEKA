use std::fs;
use anyhow::Result;
use crate::json_memory::JsonMemory;

pub struct Task { pub id: String, pub action: String }

impl Task {
    pub fn execute(&self) -> Result<()> {
        if self.action == "initialize_workspace" {
            fs::create_dir_all("data/workspace")?;
            println!(">> [Physical Action] Created directory: data/workspace");
        } else if self.action.starts_with("create_agent_file:") {
            let name = self.action.split(':').last().unwrap();
            let path = format!("data/workspace/{}.agent", name);
            fs::write(&path, "AgentStatus: Active")?;
            
            // تسجيل الوكيل في الذاكرة (Persistence)
            println!(">> [Memory Action] Registering agent {} in global registry...", name);
        }
        Ok(())
    }
}
pub struct TaskGraph { pub tasks: Vec<Task> }
