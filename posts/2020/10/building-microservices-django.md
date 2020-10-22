---
title: Part 1 - Introduction
series: Building a microservice architecture using django
author: Rodrigo E. Gimenez
authorLink: https://github.com/rodrigoegimenez
date: "2020-10-18"
updated: "2020-10-19"
keywords: django, microservices, rest
draft: true
---

A microservice architecture, as opposed to a monolithic one, implies splitting the logic behind an application 
into individually loosely coupled services. These services can then be independently developed, deployed, scaled and debugged.

Recently I decided to tackle a new work project using the microservice architecture, as opposed to the traditional monolithic one we're used to. Normally we would begin by firing up a new django project and start filling it with all the applications we need. Instead, each of these applications now became their own single django project, and deals with one specific task: one project for authentication and user management, another  for monitoring resources, another one for client management, and so on.

## Authentication and authorization

The first question that came to mind was: how to manage authentication and authorization? The widespread and simple use of JWT makes it an obvious choice. Normally JWTs are created and verified by the same backend app, and thus a single secret key for both tasks is used, using a symmetric signing algorithm like HS256. However in a distributed microservice architecture, sharing a secret key among microservices poses a big security threat. However another signing algorithm can be used in these situations, an asymmetric signing algorithm, like RS256, in which the JWT is signed using a private key but can be verified using a public key. This allows to keep the private key, well, private; and only share the public key among the rest of the microservices.

...