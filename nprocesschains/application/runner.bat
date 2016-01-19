@echo off
node startchain.js

:loop
    node runner.js
if  %errorlevel% == 0 goto loop