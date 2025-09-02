#!/bin/bash
cd /home/kavia/workspace/code-generation/myflix-streaming-platform-5581-5590/myflix_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

