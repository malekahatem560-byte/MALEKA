use anyhow::Result;
use std::collections::HashMap;
use std::sync::{Arc, RwLock};

pub trait MemoryBackend: Send + Sync {
    fn store(&self, key: &str, value: &[u8]) -> Result<()>;
    fn retrieve(&self, key: &str) -> Result<Option<Vec<u8>>>;
}

pub struct JsonMemory {
    data: Arc<RwLock<HashMap<String, Vec<u8>>>>,
}

impl JsonMemory {
    pub fn new() -> Self { Self { data: Arc::new(RwLock::new(HashMap::new())) } }
}

impl MemoryBackend for JsonMemory {
    fn store(&self, key: &str, value: &[u8]) -> Result<()> {
        let mut map = self.data.write().unwrap();
        map.insert(key.to_string(), value.to_vec());
        Ok(())
    }
    fn retrieve(&self, key: &str) -> Result<Option<Vec<u8>>> {
        let map = self.data.read().unwrap();
        Ok(map.get(key).cloned())
    }
}
