# LETS FORGET

### Introduction

A user-friendly web application that allows users to explore various discounts, deals, and offers provided by restaurants, pubs and clubs in their vicinity. Whether you're a foodie looking for a new place to dine or a party-goer searching for the best drink deals, this application has got you covered!

With an intuitive interface, the application makes it easy to browse through the latest offers, filter by location and type. Users can view detailed information about each deal

### Installation

1. Backend requires an instance of PostreSQL and SMTP server.
    - install [tilt](https://tilt.dev/) and simply run following command in project's root directory (k8s local cluster is needed with tilt)
    ```
    tilt up
    ```
2. Provide necessary backend variables in `backend/.env` file - use `backend/.template.env` for reference
3. ```
    npm i
   ```
4. ```
    npm -w backend run start:dev
   ```
5. Create development data - optional
   ```
    npm -w backend run bootstrap
   ```
6. Provide necessary frontend variables in `frontend/.env` file - use `frontend/.template.env` for reference
7. ```
   npm -w frontend run dev
   ```

### Screenshots

![Desktop offers list](/img/desktop-offers-list.png "Desktop offers list")

![Desktop offers map](/img/desktop-offers-map.png "Desktop offers map")

![Desktop offers details](/img/desktop-offers-details.png "Desktop offers details")

Offers list             |  Offers map | Place details
:-------------------------:|:-------------------------:|:-------------------------:
![Mobile offers list](/img/mobile-offers-list.jpg "Mobile offers list")  |  ![Mobile offers map](/img/mobile-offers-map.jpg "Mobile offers map") | ![Mobile offers details](/img/mobile-offers-details.jpg "Mobile offers details")