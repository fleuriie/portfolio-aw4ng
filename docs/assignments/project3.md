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
valid_types: set String
users: set User
clothes: users -> set Clothing
type: clothes -> one String
name: clothes -> one String
description: clothes -> one String
```
**Actions:**
```typescript
addClothing(c: Clothing, t: String, u: User)
    c not in u.clothes and t in valid_types
    u.clothes += c
    c.type = t


removeClothing(c: Clothing, u: User)
    c in u.clothes
    u.clothes += c
    c.type = None


search(searchType: String, searchUser: User, out clothes: set Clothing)
    searchType in valid_types
    returns clothes where c is in clothes if c.type is searchType for all c in searchUser.clothes


getType
```
:::


::: tip OUTFITING
**Name:** Outfiting[Item, User]


**Purpose:** allows User u to create an Outfit out of a combination of Items which has certain restrictions on it.


**Operational Principle:** a user can group items together to create an Outfit, which must have one pair of shoes in addition to a top and bottom or one-piece.


**State:**
```typescript
users: set User
outfits: users -> set Outfit
contents: outfits -> set Item
name: outfits -> one String
description: outfits -> one String
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


//// check if item is in outfit for sync & do validation in sync
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
**Name:** Challenging[Collection, Item, Submission, User]


**Purpose:** REWRITE! allows User to set an objective for other users to submit an Item to with parameters set by a Collection.


**Operational Principle:** REWRITE! after a user creates a challenge with parameters given by a specified Collection, it will be available for other users to see and submit entries of Items to. Then, the original user can select one or more winning entries after ending the challenge.


**State:**
```typescript
users: set User
challenges: users -> set Challenge
params: challenges -> one Collection
entries: challenges -> set Item
owners: entries -> one User
status: challenges -> one String
```
**Actions:**
```typescript
createChallenge(u: User, out c: Challenge)


endChallenge(c: Challenge, u: User)


selectWinners(c: Challenge, u: User, out winners: set Item)


enterChallenge(c: Challenge, entry: set Item)
```
:::


::: tip LABELING
**Name:** Labeling[Item]


**Purpose:** provide information about an item from a predetermined set of labels and filter items.


**Operational Principle:** if a label is added to an item by a user and not removed, then filtering on the label will display the item. Available labels are already set.


**State:**
```typescript
valid_labels: set String
items: set Item
labels: items -> set String
```
**Actions:**
```typescript
addLabel(i: Item, l: String)
	l in valid_labels and i in items and l not in i.labels
	i.labels += l
	
removeLabel(i: Item, l: String)
	l in i.labels and i in items
	i.labels -= l


filter(l: String)
	l in valid_labels
	returns items where i is in items if i.labels includes l for i in items
```
:::


::: tip ACHIEVEMENTING
**Name:** Achievementing[User]


**Purpose:** allow a User to be rewarded for good behavior and display these awards to other users.


**Operational Principle:** after a user behaves in a way that should be encouraged, they are given an achievement that reflects this behavior and is visible to other users.


**State:**
```typescript
all_achievements: set String
users: set User
user_achievements: users -> set String
```
**Actions:**
```typescript
system addAchievement(a: String, u: User)
	a in all_achievements and a not in u.user_achievements
	u.user_achievements += a
```
:::
