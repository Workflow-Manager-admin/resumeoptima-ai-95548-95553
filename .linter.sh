#!/bin/bash
cd /home/kavia/workspace/code-generation/resumeoptima-ai-95548-95553/main_container_for_resumeoptimia_ai
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

