# How to deploy

## Frontend (Vercel)
 - Connect Vercel with gihub
 - Import the repository
 - Set the root directory to `web`
 - Deploy
 - Set Environment variable (`REACT_APP_API_URL`)

## Bckend (AWS)
- Create a EC2 instance and conect with the instance
- Run the following command
  ```
  git pull origin https://github.com/sayansaha934/blog-app.git
  sudo apt update
  sudo apt install -y python3 python3-pip tmux
  cd backend
  pip install -r requirements.txt
  tmux new -s backend (to create a new session)
  python3 -m uvicorn main:app  --port 8000 --host 0.0.0.0 --forwarded-allow-ips=*
  ``` 
- Create a target group and attach it with the above EC2 instance
- Create a load balancer and associate it with the target group
