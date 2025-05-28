import axios from 'axios';

let tools = []; // 最终导出的工具数组


const fetchTools = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tools');
    tools = response.data.map(tool => ({
      ...tool,
      tags: tool.tags ? tool.tags.split(',') : [], 
    }));
  } catch (error) {
    console.error('获取工具数据失败:', error);
    tools = [];
  }
};

await fetchTools(); 

export default tools;
