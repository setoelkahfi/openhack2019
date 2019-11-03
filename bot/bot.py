# -*- coding: utf-8 -*-
"""
solarchek is a compnay doing this. To run code in terminal type: python bot.py
"""
import re
import requests
import time
import datetime
import random
from textmessage import send_text
from generate_question import ask_qa

#The web-hook to 
slack_hook = "https://hooks.slack.com/services/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"

#Save the number from text
from_number, message = send_text()

#Save timestamp 
ts = time.time()
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

#parse the message for keywords

tags = []
def get_word(word, message, replace = None):
   message = message.replace(" ","_")
   match = re.search(word, message)
   if match is not None:
       if replace:
           tags.append(replace)
       else:
           tags.append(word)
for w in ("solar_panel","solar panel", "solarpanel"),"battery","wire":
   if isinstance(w, str):
       get_word(w, message)
   else:
       for x in w:
           get_word(x, message, replace = w[0])
tags = list(dict.fromkeys(tags))
tag_string = " ".join(tags)

#send notification to all the trainees and to Jamie
case_number = random.randint(1,1000)
total_message = "%s Reported at date/time: %s Contact info to reporter: %s \n Problem description: %s" % (case_number, st, from_number,message) 
data = {"text": "New case number:" + total_message}
print(data)
r = requests.post(url = slack_hook, json = data)
print(r.json)

total_data = "Case number: %s Reported at date/time: %s <br> Contact info to reporter: %s <br> Problem description: %s" % (case_number, st, from_number,message) 
print(total_data)
ask_qa(title= "A new case has been created", text= total_data, tags= tag_string)
