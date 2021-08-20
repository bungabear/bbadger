# Gather-Online-Count-Badge

Can make badge for gather.town online user count.

1. Get apiKey  
    https://gather.town/apiKeys  
2. Find gether room id  
    Go to https://gather.town/app  
    Then select your room and click 'Enter Space'

3. Test Url
    ```
    https://gather.town/api/getRoomInfo?room=[**room id here**]&apiKey=[**apiKey here**]
    ```
4. Test Badge
    ```
    https://gather-online-count-badge.herokuapp.com/?url=https://gather.town/api/getRoomInfo?room=[**room id here**]&apiKey=[**apiKey here**]
    ```
5. Embed as image  