const fs=require('fs/promises');
const path=require('path');
const dbPath=path.join(__dirname,'../db.json');

const readData=async ()=>{
  const data=await fs.readFile(dbPath,'utf8');
  return JSON.parse(data);
};

const writeData=async (data)=>{
  await fs.writeFile(dbPath,JSON.stringify(data,null,2));
};

const getAll=async ()=>{
  return await readData();
};

const getById=async (id)=>{
  const items=await readData();
  return items.find((item)=>item.id==id);
};

const create=async (data)=>{
  const items=await readData();
  let maxId=0;
  for(let i=0;i<items.length;i++){
    if(items[i].id>maxId){
      maxId=items[i].id;
    }
  }
  const newItem={id:maxId+1,...data};
  items.push(newItem);
  await writeData(items);
  return newItem;
};

const update=async (id,data)=>{
  const items=await readData();
  const index=items.findIndex((item)=>item.id==id);
  if(index===-1) return null;
  items[index]={id:Number(id),...data};
  await writeData(items);
  return items[index];
};

const patch=async (id,data)=>{
  const items=await readData();
  const index=items.findIndex((item)=>item.id==id);
  if(index===-1) return null;
  items[index]={...items[index],...data,id:items[index].id};
  await writeData(items);
  return items[index];
};

const remove=async (id)=>{
  const items=await readData();
  const index=items.findIndex((item)=>item.id==id);
  if(index===-1) return false;
  items.splice(index,1);
  await writeData(items);
  return true;
};

module.exports={
  getAll,
  getById,
  create,
  update,
  patch,
  remove,
  readData,
  writeData
};
