---
title: P3 Convergent Design
layout: doc
---

# Project 3: Convergent Design

## Functional Design

Concepts that are in our app, but are not described in detail here because they're generic: Authing, Sessioning, Upvoting, Friending

::: tip CLOTHING
**Name:** Clothing[User]

**Purpose:** represents an article of Clothing owned by a User, as well as what type of clothing it is.

**Operational Principle:** a user can upload a picture of an article of clothing they own such that this item will now be a part of their set of clothing, and will have type (hat, shirt, pants, etc.) specified by the user.

**State:**
```typescript
users: set User
clothes: users -> set Clothing
type: clothes -> set String
```
**Actions:**
```typescript
addClothing(c: Clothing, t: String, u: User)
    c not in u.clothes
    u.clothes += c
    c.type = t

removeClothing(c: Clothing, u: User)
    c in u.clothes
    u.clothes += c
    c.type = None

search(searchType: String, searchUser: User, out clothes: set Clothing)
    precondition: searchType is valid String
    returns clothes where c is in clothes if c.type is searchType for all c in searchUser.clothes
```
:::

::: tip OUTFITING
**Name:** Outfiting[Item, User]

**Purpose:** allows User u to create an Outfit out of a combination of Items.

**Operational Principle:** a user can group items together to create an Outfit, which must have one pair of shoes in addition to a top and bottom or one-piece.

**State:**
```typescript
users: set User
outfits: users -> set Outfit
contents: outfits -> set Item
```
**Actions:**
```typescript
addOutfit(items: set Item, u: User, out o: Outfit)
    o = new Outfit(items)
    u.outfits += o
    o.contents = items

removeOutfit(o: Outfit, u: User)
    o in u.outfits
    o.contents = None
    u.outfits -= o

addItemToOutfit(o: Outfit, i: Item, u: User)
    o in u.outfits
    o.contents += i

removeItemFromOutfit(o: Outfit, i: Item, u: User)
    o in u.outfits and i in o.contents
    o.contents -= i

// how to validate outfits here?
```
:::

::: tip COLLECTIONING
**Name:** Collectioning[Item, User]

**Purpose:** a User can group Items into collections representing a set or subset of items they own.

**Operational Principle:** after a User creates a collection, and before they delete it, the user can add items to the collection such that when the user views the collection, the item will be there.

**State:**
```typescript
users: set User
collections: users -> set Collection
contents: collections -> set Item
```
**Actions:**
```typescript
createCollection(u: User)
    c = new Collection()
    u.collections += c

deleteCollection(c: Collection, u: User)
    c in u.collections
    u.collections -= c
    c.contents = None

addItem(c: Collection, i: Item, u: User)
    c in u.collections
    c.contents += i

deleteItem(c: Collection, i: Item, u: User)
    c in u.collections and i in c.contents
    c.contents -= i
```
:::

::: tip CHALLENGING
**Name:** Challenging[Collection, Item, User]

**Purpose:** allows User to set an objective for other users to create a set of Items out of a limited selection given by a Collection.

**Operational Principle:** after a user creates a challenge with parameters given by a specified Collection, it will be available for other users to see and submit entries of sets of Items to. Then, the original user can select one or more winning entries after ending the challenge.

**State:**
```typescript
users: set User
challenges: users -> set Challenge
params: challenges -> one Collection
entries: challenges -> [set Item]
```
**Actions:**
```typescript
createChallenge(u: User, out c: Challenge)

endChallenge(c: Challenge, u: User)

selectWinners(c: Challenge, u: User, out [set Item])
```
:::

::: tip LABELING
**Name:** Labeling[Item]

**Purpose:** provide information about an item.

**Operational Principle:** an item is given a label that provides information about it.

**State:**
```typescript

```
**Actions:**
```typescript

```
:::

::: tip ACHIEVEMENTING
**Name:** Achievementing[User]

**Purpose:** allow a User to be rewarded for good behavior and display these awards to other users.

**Operational Principle:** after a user behaves in a way that should be encouraged, they are given an achievement that reflects this behavior and is visible to other users.

**State:**
```typescript

```
**Actions:**
```typescript

```
:::