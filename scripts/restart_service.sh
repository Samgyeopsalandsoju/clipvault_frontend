#!/bin/bash
cd ~/frontend/current

if pm2 list | grep -q "clipvault"; then
    pm2 restart clipvault
else
    pm2 start "pnpm start" --name clipvault
fi

echo "Next.js server restarted!"