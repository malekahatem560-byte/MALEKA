use anyhow::{anyhow, Context, Result};
use petgraph::algo::toposort;
use petgraph::graph::{DiGraph, NodeIndex};
use tracing::info;

use crate::agent_context::AgentContext;
use crate::brain::{Intent, Reflector}; // استيراد وحدة التأمل
use crate::task_graph::Task;
use crate::templates;

#[derive(Clone)]
pub struct Planner { pub ctx: AgentContext }

impl Planner {
    pub fn new(ctx: AgentContext) -> Self { Self { ctx } }

    pub async fn plan_and_execute(&self, intent: Intent) -> Result<()> {
        let (graph, _roots) = self.build_graph(intent)?;
        let order = toposort(&graph, None).map_err(|c| anyhow!("Cycle: {:?}", c))?;

        for ix in order {
            let task = &graph[ix];
            let ctx_arc = std::sync::Arc::new(self.ctx.clone());
            
            // تنفيذ المهمة مع التقييم
            let result = (task.run)(ctx_arc.clone()).await;
            
            // التغذية الراجعة (الوعي)
            Reflector::reflect(&ctx_arc, &task.name, result.is_ok());
            
            result.context(format!("Task `{}` failed", task.name))?;
        }
        Ok(())
    }
    // ... (بقية الـ build_graph كما هي)
}
