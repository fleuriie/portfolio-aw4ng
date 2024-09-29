---
title: Assignment 3
layout: doc
---

# Assignment 3
[[toc]]

## Pitch
Pocanet (poh-cah-net) is an app that is intended to give k-pop photocard collectors a unified platform to track their collections, find other collectors to trade with and buy from, and meet and connect with other collectors. 

Currently, k-pop collector communities form on two different types of existing apps: social media sites like Instagram, X, and Reddit, and marketplaces like Ebay or Mercari. Social media sites serve the purpose of allowing collectors to crowd-source ideal market values of photocards and make collector friends, but searching for specific photocards to buy is difficult, especially if they are less common, and there is a significant risk of getting scammed. Thus, collectors on social media sites often avoid buying or trading because they have few avenues of recourse if they have a negative experience with a seller.

Marketplaces solve these problems, but it's difficult to make human connections for those who are interested and sellers often overprice their photocards or sell fakes, requiring buyers to have a high level of knowledge about collecting in order to have a good experience. 

Pocanet, because it is designed specifically with the aim of catering to the needs of k-pop collectors, will combine the strengths of both pre-existing types of apps and work to become an all-in-one stop for collectors. They will be able to track the status of cards they have and want, find other people who are willing to trade or sell the cards they want, and review sellers or traders they have completed transactions with.

## Functional design
### Concepts
::: tip USER
**Name:** User

**Purpose:** Authenticate users so that app users correspond to people

**Operational Principle:** After a user registers with a username and password pair (u,p), they can authenticate as that user by providing (u,p).

**State:**
```typescript
registered: set User
username: registered -> one String
password: registered -> one String
```
**Actions:**
```typescript
register(u, p: String, out user: User)
    user not in registered
    registered += user
    user.username := u
    user.password := p
authenticate(u, p: String, out user: User)
    user in registered
    user.username = u and user.password = p
exists(user: User, out exist: Boolean)
    exist := user in registered
getUsername(u: User, out username: String)
    u in registered
    username := user.username
```
:::

::: tip SESSIONING
**Name:** Sessioning[User]

**Purpose:** Authenticate user for an extended period of time

**Operational Principle:** After a session s starts for a user u, and as long as it is active, we can identify that u as associated with s.

**State:**
```typescript
active: set Session
user: active -> one User
```
**Actions:**
```typescript
start(user: User, out s: Session)
    s not in active
    active += s
    s.user := user
getUser(s: Session, out user: User)
    s in active
    user := s.user
end(s: Session)
    active -= s
```
:::

::: tip PHOTOCARD
**Name:** Photocard

**Purpose:** Provide metadata about photocards

**Operational Principle:** A photocard with tags is added to the system and the photocard can be found by its tags.

**State:**
```typescript
photocards: set Photocard
tags: photocards -> set String
```
**Actions:**
```typescript
addPhotocard(p: Photocard)
    p not in photocards
    photocards += p

removePhotocard(p: Photocard)
    p in photocards
    photocards -= p

duplicatePhotocard(p: Photocard, out p2: Photocard)
    p in photocards
    p2 := p

addTag(p: Photocard, t: String)
    p in photocards
    t not in p.tags
    p.tags += t

removeTag(p: Photocard, t: String)
    p in photocards
    t in p.tags
    p.tags -= t

search(searchTags: set String, out pcs: set Photocard)
    returns pcs where p is in pcs if searchTags is in p.tags for all p in photocards
```
:::

::: tip DISCOVERING
**Name:** Discovering[User, Item]

**Purpose:** Show users Item i they have not seen before based on what they are most likely to want to see

**Operational Principle:** After a user chooses to start discovering, they will be shown Item i with owner User u they have not seen before that they are likely to be interested in based on data collected about them.

**State:**
```typescript 
users: set User
items: set Item
owner: items -> one User
seen: users -> set Item
```
**Actions:**
```typescript 
system addItem(owningUser: User, i: item)
    i not in items
    i.owner := owningUser
    items += i

system deleteItem(i: item)
    i in items
    items -= i
    
system recommend(user: User, out owningUser: User, out i: Item)
    if user not in users users += user
    i in items
    i not in user.seen
    owningUser := i.owner
    user.seen += i
```
:::

::: tip CATALOGING
**Name:** Cataloging[Item]

**Purpose:** Keep track of all items in a database and user collections of items in separate databases per user

**Operational Principle:** Users can get or modify an individual user u's collection or can view the system catalog of all items.

**State:**
```typescript
users: set User
catalog: set Item
collection: users -> set Item
```
**Actions:**
```typescript
system addItem(i: Item)
    i not in catalog
    catalog += i

system removeItem(i: Item)
    i in catalog
    catalog -= i

userAddItem(u: User, i: Item)
    if u not in users users += u
    i not in u.collection
    u.collection += i

userRemoveItem(u: User, i: Item)
    if u not in users users += u
    i in u.collection
    u.collection -= i
```
:::

::: tip MESSAGING
**Name:** Messaging[User]

**Purpose:** To allow users to communicate with each other

**Operational Principle:** A user can send a message to another user if they are not blocked, who can read it and reply. 

**State:**
```typescript
users: set User
messages: users -> set chatHistory
chatHistory: User -> set String

status: users -> set read
read: User -> one Boolean

blocked: users -> set User
```

**Actions:**
```typescript
sendMessage(sender: User, receiver: User, m: String)
    if sender not in users users += sender
    if receiver not in users users += receiver
    receiver.sender.messages += m
    reciver.sender.status = False

blockUser(blocker: User, blockee: User)
    blockee not in blocker.blocked
    blocker.blocked += blockee

unblockUser(blocker: User, unblockee: User)
    unblockee in blocker.blocked
    blocker.blocked -= unblockee

readMessage(sender: User, receiver: User, out m: set String)
    if sender not in users users += sender
    if receiver not in users users += receiver
    m := reciver.sender.messages
    receiver.sender.status = True
```
:::

::: tip REVIEWING
**Name:** Reviewing[User]

**Purpose:** To allow users to give feedback to other users based on their behavior

**Operational Principle:** A user can leave a review with their numerical and textual evaluation of another user and it will be available for all users to see.

**State:**
```typescript
users: set User
rating: User -> one Int
review: User -> one String
receivedRatings: users -> set rating
receivedReviews: users -> set review
```

**Actions:**
```typescript
leaveFeedback(giver: User, taker: User, rating: Int, review: String)
    if giver not in users users += giver
    if taker not in users users += taker
    taker.receivedRatings += (giver, rating)
    taker.receivedReviews += (giver, review)

getAverageRatings(u: User, out average: Int)
    u in users
    average is the average of all ratings in u.receivedRatings

showFeedback(u: User, out ratings: set Int, out reviews: set String)
    u in users
    ratings := u.receivedRatings
    reviews := u.receivedReviews
```
:::

### Synchronizations
```typescript
app PocaNet
    include User
    include Sessioning[User]
    include Photocard
    include Discovering[User, Photocard]
    include Cataloging[Photocard]
    include Messaging[User]
    include Reviewing[User]

sync register(username, password: String, out user: User):
    User.register(username, password, user)

sync login(username, password: String, out user: User, out s: Session):
    when User.authenticate(username, password, user)
    Sessioning.start(user, s)

sync logout(s: Session):
    Sessioning.end(s)

system sync authenticate(s: Session, u: User):
    Sessioning.getUser(s, u)

system sync addPhotocard(p: Photocard):
    Cataloging.addItem(p)
    Photocard.addPhotocard(p)

system sync removePhotocard(p: Photocard):
    Cataloging.removeItem(p)
    Photocard.removePhotocard(p)

system sync addTagToPhotocard(p: Photocard, tag: String):
    Photocard.addTag(p, tag)

system sync removeTagFromPhotocard(p: Photocard, tag: String):
    Photocard.removeTag(p, tag)

sync searchCatalog(searchTags: set String, out pcs: set Photocard):
    pcs := Photocard.search(searchTags)

sync searchCollection(userToSearch: User, searchTags: set String, out pcs: set Photocard):
    searchTags += User.getUsername(userToSearch)
    pcs := Photocard.search(searchTags)

sync addToCollection(u: User, s: Session, p: Photocard):
    # to add to a collection, the system duplicates the photocard that 
    # exists in the catalog and adds a tag with the user's username.

    Sessioning.getUser(s, u)
    p2 := Photocard.duplicatePhotocard(p)
    Photocard.addTag(p2, User.getUsername(u))
    Cataloging.userAddItem(u, p2)

sync removeFromCollection(u: User, s: Session, p: Photocard):
    Sessioning.getUser(s, u)
    Photocard.removePhotocard(p)
    Cataloging.userRemoveItem(u, p)

sync addTagToPhotocard(u: User, s: Session, p: Photocard, t: String):
    Sessioning.getUser(s, u)
    Photocard.addTag(p, t)

sync removeTagFromPhotocard(u: User, s: Session, p: Photocard, t: String):
    Sessioning.getUser(s, u)
    Photocard.removeTag(p, t)

sync markPhotocardAvailable(u: User, s: Session, p: Photocard):
    Sessioning.getUser(s, u)
    Photocard.addTag(p, "available")
    Discovering.addItem(u, p)

sync markPhotocardUnavailable(u: User, s: Session, p: Photocard):
    Sessioning.getUser(s, u)
    Photocard.removeTag(p, "available")
    Discovering.removeItem(p)

sync discover(u: User, out owningUser: User, out p: Photocard):
    User.exists(u)
    owningUser, p := Discovering.recommend(u)
    averageRatings := Reviewing.getAverageRatings(owningUser)
    if averageRatings is below a certain threshold we call Discovering.recommend(u) again
    
    # the user will only be shown cards from sellers with low average ratings
    # if there are no cards remaining from sellers with high average ratings

sync sendMessageToUser(s: Session, sender: User, receiver: User, m: String):
    Sessioning.getUser(s, sender)
    User.exists(receiver)
    Messaging.sendMessage(sender, receiver, m)

sync readMessageFromUser(s: Session, sender: User, receiver: User, out m: set String):
    Sessioning.getUser(s, receiver)
    User.exists(sender)
    Messaging.readMessage(sender, receiver, m)

sync blockUser(s: Session, blocker: User, blockee: User):
    Sessioning.getUser(s, blocker)
    User.exists(blockee)
    Messaging.blockUser(blocker, blockee)

sync unblockUser(s: Session, unblocker: User, unblockee: User):
    Sessioning.getUser(s, unblocker)
    User.exists(unblockee)
    Messaging.unblockUser(unblocker, unblockee)

sync leaveFeedbackForUser(s: Session, sender: User, receiver: User, rating: Int, review: String):
    Sessioning.getUser(s, sender)
    User.exists(receiver)
    Reviewing.leaveFeedback(sender, receiver, rating, review)

sync viewAverageRatingsForUser(u: User, out averageRating: Int):
    Reviewing.getAverageRatings(u, averageRating)

sync viewFeedbackForUser(u: User, out ratings: set Int, out reviews: set String):
    Reviewing.showFeedback(u, ratings, reviews)
```


### Dependency Diagram
![Dependency Diagram](../images/Dependency%20Diagram.jpg)

## Wireframes
Here is a link to my wireframe: [wireframe](https://www.figma.com/design/ScTYp3Z1ly8nj9rIYxWqwi/6.1040-PocaNet-Initial-Wireframe?node-id=1-3&t=5WmpN6TYznpOfcqZ-1)

## Design tradeoffs
* **Universal tags**: I was stuck for a while between whether I wanted to have tagging as a concept (thus allowing me to implement different types of tags for system/classification tags and user-generated tags) or to not draw distinctions between different types of tags. I ended up choosing the latter because I thought it would give increased flexibility as I built my app. For instance, this enabled me to synchronize a user adding a card to their collection by simply adding a tag with their username to that photocard (in implementation, this would probably not be displayed to the user). However, this did have the tradeoff of me having to be much more careful of when I was allowing users to add/remove tags, as they might inadvertently remove tags the system needed to function.

* **Duplicating photocards**: Based off of the design decision I made regarding universal tags, I then had to decide exactly how to implement users adding photocards to their libraries. I could either have them add references to the universal list of photocards (the catalog, in this case) or I could have them make copies of the photocards in the universal list. I ended up choosing the latter because I thought it would simplify the Photocard concept considerably if there were no difference between photocards in user collections and photocards in the catalog. However, as I build my app, this might result in considerably more storage required due to the requirement of duplicating each photocard to add it to a user's collection.

* **Displaying profiles and feedback to unauthenticated users**: Finally, I had to decide whether to require users to be logged in (authenticated) before they could view others' profiles and the feedback they received from other users. If I did not require this, people might be able to check out the site before committing to signing up for an account, and decide whether the sellers for photocards or groups they are interested in are generally trustworthy before registering. However, making this information public might expose the site to bad actors or expose personal information of users, particularly if people leave reviews about sellers' location or post pictures of envelopes. I decided that the benefits of making this information public outweighed the drawbacks, which I could mitigate in practice with moderation and reviewing all potential feedback before it is posted.