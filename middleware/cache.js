const cache={};
const TTL=60000;

const cacheMiddleware=(req,res,next)=>{
  let key=req.originalUrl||req.url;
  let entry=cache[key];
  let now=Date.now();
  if(entry){
    if(now-entry.createdAt<TTL){
      res.setHeader('X-Cache','HIT');
      return res.json(entry.data);
    }
    delete cache[key];
  }
  res.setHeader('X-Cache','MISS');
  let originalJson=res.json.bind(res);
  res.json=(data)=>{
    if(res.statusCode>=200&&res.statusCode<300){
      cache[key]={
        data:data,
        createdAt:Date.now()
      };
    }
    return originalJson(data);
  };
  next();
};

const invalidateCache=()=>{
  for(let key in cache){
    delete cache[key];
  }
};

const invalidateMiddleware=(req,res,next)=>{
  let originalJson=res.json.bind(res);
  res.json=(data)=>{
    if(res.statusCode>=200&&res.statusCode<300){
      invalidateCache();
    }
    return originalJson(data);
  };
  next();
};

module.exports={
  cache,
  cacheMiddleware,
  invalidateCache,
  invalidateMiddleware
};
