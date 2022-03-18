const getComments = async () => (
  [
      {
        "id": "12jk31l",
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "peopleWhoMarkedLikes": [
          108923,
          81238921,
          51212,
          32948
        ],
        "parentId": null,
        "user": {
          "image": {
            "png": "./assets/images/avatars/image-amyrobson.png",
            "webp": "./assets/images/avatars/image-amyrobson.webp"
          },
          "id": 108923,
          "username": "amyrobson"
        }
      },
      
      {
        "id": "12shu31l",
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "parentId": null,
        "peopleWhoMarkedLikes": [
          108923,
          81238921,
          51212
        ],
        "user": {
          "image": {
            "png": "./assets/images/avatars/image-maxblagun.png",
            "webp": "./assets/images/avatars/image-maxblagun.webp"
          },
          "id": 81238921,
          "username": "maxblagun"
        }
      },

      {
        "id": "laoso2",
        "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        "createdAt": "1 week ago",
        "score": 4,
        "replyingTo": "maxblagun",
        "parentId": "12shu31l",
        "peopleWhoMarkedLikes": [
          108923,
          81238921,
        ],
        "user": {
          "image": {
            "png": "./assets/images/avatars/image-ramsesmiron.png",
            "webp": "./assets/images/avatars/image-ramsesmiron.webp"
          },
          "id": 51212,
          "username": "ramsesmiron"
        }
      },

      {
        "id": "5a6sd5",
        "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        "createdAt": "2 days ago",
        "score": 2,
        "replyingTo": "ramsesmiron",
        "parentId": "12shu31l",
        "peopleWhoMarkedLikes": [
          81238921,
          51212
        ],
        "user": {
          "image": {
            "png": "./assets/images/avatars/image-juliusomo.png",
            "webp": "./assets/images/avatars/image-juliusomo.webp"
          },
          "id": 32948,
          "username": "juliusomo"
        }
      }
    ]
  
)

export default getComments;