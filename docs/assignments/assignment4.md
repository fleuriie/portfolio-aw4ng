---
title: Assignment 4
layout: doc
---

# Assignment 4
[[toc]]

## Backend Code Repository
[Backend Code](https://github.com/fleuriie/pocanet-backend)

## Deployed Service
[Deployed Service](https://pocanet-backend.vercel.app/)

## Data Modeling
For this assignment, I ended up deciding not to implement the feedback from A3, which was mainly to split up my Photocarding concept into a Posting and Labeling concept. I thought that this was a good idea in principle, but that my Photocarding concept was distinct enough from the existing Posting concept (for instance, users cannot make their own Photocards, they can only copy ones that already exist in the system to their own collections) that splitting it up would only overcomplicate the concept. Thus, I left most of my concepts untouched as they were in A3, and [here](https://fleuriie.github.io/portfolio-aw4ng/assignments/assignment3.html#concepts) is a link to the concepts for reference. 

One change I did make was a minor change to rename my User concept to Authenticating for clarity (to avoid mixing up the User concept with the User data type):

::: tip AUTHENTICATING
**Name:** Authenticating

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

### Diagram
![Diagram](../images/A4%20Draft.jpg)
Red = Photocard concept, Green = Cataloging concept, Yellow = Authenticating concept, Purple = Messaging concept

## Design Reflection
I ran into an issue where I had to decide how I would implement the ability for users to add photocards and edit tags. I originally thought that in the synchronized function call in my app, I would pass in the user whose collection would be edited as a parameter. However, in practice, I realized that in order to implement this I would need to have multiple checks to make sure that the user had permission to edit the photocard they wanted to (for example, I would have to have a check in the Photocarding concept, one in the Cataloguing concept, and in the Discovering concept eventually). Thus, I ended up removing this parameter and just passing in a session instead to automatically infer which user's collection to edit.

I also ran into a similar issue when thinking about using tags indiscriminately. Originally, my only way of marking the owner of a photocard was to tag the photocard with their username. Similarly, the only way of distinguishing system photocards was a tag. In practice, this became a problem when I considered the ability for users to add and delete tags -- a user could add their username to tag themselves as the owner of a system card and then deleted it. Similarly, they could add other users' usernames as tags to add unwanted cards into their collections. I dealt with this by first ensuring that in order for a user to modify tags on a card, the system would check to make sure that they had an "owner:" tag on that card. Then, there were several types of tags that would not be allowed (for example, "System" and "owner:" tags which have administrative purposes). This allowed me to keep my earlier design choice of using tags as a differentiating method and still keep the integrity of the catalog secure.