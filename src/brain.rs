use crate::agent_context::AgentContext;
use std::sync::Arc;

pub struct Reflector;

impl Reflector {
    // وظيفة الوعي: تقييم ما حدث
    pub fn reflect(ctx: &Arc<AgentContext>, task_name: &str, success: bool) {
        let status = if success { "SUCCESS" } else { "FAILED" };
        let reflection = format!("Task '{}' finished with status: {}", task_name, status);
        
        // تخزين التأمل في الذاكرة للرجوع إليه لاحقاً
        if let Some(mem) = &ctx.memory {
            let key = format!("log:{}", chrono::Utc::now().timestamp());
            let _ = mem.store(&key, reflection.as_bytes());
        }
        
        println!(">> [SELF-AWARENESS]: {}", reflection);
    }
}
