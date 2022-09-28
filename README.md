# Eleventy Material
Eleventy Material is a very opiniated blogging theme for Eleventy, built with the [MDUI framework](https://github.com/zdhxiong/mdui) and written by a newbie that have no idea how to write a good code 👌😳👌.

## Mobile score 😮
![LightHouse Mobile](./screenshots/LightHouse-Mobile.png)

## Desktop score 😍
![LightHouse Desktop](./screenshots/LightHouse-Desktop.png)

# Features
I'm not sure what would you expect from this theme but I'll try to list anything I can remember 😳:
- Material Design 2 theme 😊
- Dark mode toggle (enabled by default) using localStorage API 😎
- Images are lazily loaded by default (if you use the ```{% image %}``` shortcode) 😌
- Almost perfect 100 score on LightHouse on both Desktop and Mobile test 👌😌👌
- Static assets are cached for 6 months (configurable through ```_headers``` and ```_headers.njk```) 😮

# How to use
1. Install Git
2. Install NodeJS
3. Clone this repo
4. Run ```npm run build```
5. Profit(n't) 👌😌👌

Available commands:
- ```npm run dev``` - to start the development server
- ```npm run build``` - to build the site

That's just it 👍

---

You can use the theme as-is but you definitely want to make some changes, feel free to do so.  
Please take a look at the /data/ folder and see what you might seem want to change.

To write an article/post, put them inside the /posts/ folder.

# TO DO (or not to do... no promise ✌️😁✌️)
- Add search functionality 🫢
- Add workbox for generating the service-worker (if it's ever needed...)
- Add a bit of an animation .onload()?