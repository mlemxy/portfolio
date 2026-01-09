import requests

url = "https://hk4e-api-os.mihoyo.com/event/sol/sign?act_id=e202102251931481&lang=en-us"

cookies = {'ltuid': "replace_with_your_uid", 'ltoken': "replace_with_your_token"}

r = requests.post(url, cookies=cookies)
print(r.json())


