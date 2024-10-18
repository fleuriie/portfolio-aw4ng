---
title: Assignment 5
layout: doc
---

# Assignment 5
[[toc]]

## Frontend Code Repository
[Link to frontend code](https://github.com/fleuriie/pocanet-frontend)

## Deployed Frontend
[Link to deployed frontend](https://pocanet-frontend.vercel.app/)

## Heuristic Evaluation
### Usability Criteria
::: tip DISCOVERABILITY
- In general, I think my wireframe does well at discoverability. All the relevant functionality is present in the navbar and has names that clearly indicate what each link does ("Browse All Photocards", "Messages", "My Profile", "Search for a photocard..."). 
- Where I think I could do better for discoverability is to give the "Discover" card a clearer name that indicates its functionality better. 
- I also think that my wireframe could do a better job of teaching users what different functions do. For example, it is unclear how, if a user saves a photocard for later, how they should go about finding that photocard again.
- Lastly, the site in general sort of assumes a basic user familiarity with photocards and how photocard trading operates, which might not be very friendly to new users (for example, there is no description of what the site does on the home page and there's no guidelines on what the tagging system is).
:::

::: tip PLEASANTNESS
- The wireframe is very unpleasant to look at, and it's entirely in shades of gray with no icons or visual stimuli for users.
- I wish that I had used more symbols in this design instead of relying on text to guide users where they need to go, because it's very boring.
- However, using symbols instead of text might trade off with discoverability for users who might not be familiar with the symbols I use, particularly in the context of components like Discover.
:::

### Physical Heuristics
::: tip PERCEPTUAL FUSION
- I didn't account for this when creating my Wireframe, and so I will definitely keep it in mind when designing my frontend.
- The places where I anticipate there being the most time delays are the Discovery component, which needs to draw a new photocard for the user every time they click "Next photocard", and on loading users' collections, especially if they are very large.
- One strategy for dealing with this would probably be to add a loading bar or spinning wheel to indicate to the user that things are in the process of loading, or to partially load some elements and load the others while the user is looking at the ones that have loaded.
- Another area to consider perceptual fusion might be in messaging, where I might borrow from existing messaging apps like Discord and have the user's message gray out after they press send before becoming solid when it's officially sent.
:::

::: tip MAPPING
- I somewhat considered this heuristic when I was doing my initial design. For example, on the Profile page it lists the summary statistics at the top of the page for users who just want to take a quick look at the profile and lets users click in to view more.
- The filters are all grouped together, as well as the sorting mechanisms for viewing photocards, which matches their functionality as ways in which to filter down or customize the photocard viewing experience.
- Another way in which the app demonstrates a level of mapping is that on the Collection page, the edit buttons are right next to the photocards they would modify and photos/ratings/reviews that are from the same user are all grouped together, providing clarity for users.
:::

### Linguistic Level
::: tip CONSISTENCY
- One area in which I wasn't very consistent is that I wanted to give users the ability to filter reviews the same way in which they could filter photocards in a collection, but on the Reviews page I didn't end up implementing a similar design for the filter system (and in fact didn't implement it at all).
- The interface is relatively consistent across other social media apps -- on Instagram web, for example, their DMs page has a list of all the user's messages on the left and the current conversation on the right, with the ability for users to send messages.
- However, the interface's reviews page is not consistent, due to the lack of aforementioned filter options for a user's reviews or a summary of general points about the user at the top of the reviews page (like the one that Ebay has).
- Enforcing too much consistency (for example, trying to make the selling/buying functionality of the app like that of Ebay) might conflict with the goal of pleasantness, because ecommerce sites like Ebay aim to provide as much information as possible to their users without that much thought as to attractive design.
- I do end up reusing the same search symbol for both searching for all photocards across the app and in searching in a user's collection, which creates consistency for users so that they expect the same results, only filtered down to a user's collection.
:::

::: tip INFORMATION SCENT
- One thing that's missing from my app is a help or a FAQ page, which leaves users who are confused about where to find certain pages with no recourse.
- It's also missing the option to search the site for a specific page, but this is less important due to the limited number of pages on the app and allowing users to search for a specific page might compromise privacy and security of the site if I did not take the proper precautions to only make certain pages accessible to them.
:::