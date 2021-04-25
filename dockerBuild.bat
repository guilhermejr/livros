@echo off

docker rmi -f guilhermejr/livros

docker builder prune -f

docker build -t guilhermejr/livros . -f docker/Dockerfile

docker push guilhermejr/livros

pause
