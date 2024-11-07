@echo off
cd %~dp0
start cmd /k "docker build -t us ."
