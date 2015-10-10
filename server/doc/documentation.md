The server has a full JSON REST api to manage messages from the feed.

## Methods

* `GET` · `/api/feed[?offset=0][&limit=25]` → `Feed` : gets all the last messages.
* `POST` · `/api/feed` → `Message` : posts a new message to the feeds and returns the created entity. The sent body must contains `author` and `content` properties.
* `DELETE` · `/api/feed/:id` → `Success` : deletes the message with the identifier `:id`.

## Objects

### Feed

Properties :

* `₪.messages` → `Array<Message>` : all the messages.
* `₪.offset` → `int` : the starting offset index of the messages.
* `₪.limit` → `int` : the max number of returned messages.

Example :

```
{
    "messages": [
        {
            "author": "Jane",
            "content": "Hello every body !",
            "date": "2015-10-10T01:08:33.563Z",
            "_id": 2
        },
        {
            "author": "John",
            "content": "Great weather today !",
            "date": "2015-10-10T02:50:08.987Z",
            "_id": 3
        }
    ],
    "offset": 0,
    "limit": 50
}
```

### Message

Properties :

  * `₪.author` → `String` : name of the author.
  * `₪.content` → `String` : body content of the message.
  * `₪.date` → `String` : the creation date of the message.

Example :

```
{
    "author": "John",
    "content": "Great weather today !",
    "date": "2015-10-10T02:50:08.987Z",
    "_id": 3
}
```

### Success

Properties :

  * `₪.success` → `int` : `0` if failed, else succeeded.

Examples :

```
{
    "success": 1
}
```
