#!/usr/bin/env bash
# IndexNow submit — run after each deploy to ping Bing/Yandex with every URL
# in sitemap.xml, instead of waiting for them to discover changes on their
# own crawl schedule. Google doesn't participate in IndexNow, so this speeds
# up Bing/Yandex impressions specifically, not Google's.
KEY="7a5278b62b2ad8699354f782442a849b"
HOST="fitsmart.space"
URLS=$(curl -s "https://$HOST/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g')
python3 - "$KEY" "$HOST" $URLS <<'PY'
import json,sys,urllib.request
key,host=sys.argv[1],sys.argv[2]; urls=sys.argv[3:]
body=json.dumps({"host":host,"key":key,"keyLocation":f"https://{host}/{key}.txt","urlList":urls}).encode()
req=urllib.request.Request("https://api.indexnow.org/indexnow",data=body,headers={"Content-Type":"application/json"})
try:
    r=urllib.request.urlopen(req,timeout=30); print("IndexNow:",r.status,"—",len(urls),"URLs")
except Exception as e: print("IndexNow error:",e)
PY
