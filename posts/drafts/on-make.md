---
title: Making your life easier with GNU Make
author: Rodrigo E. Gimenez
authorLink: https://github.com/rodrigoegimenez
date: "2021-03-18"
keywords: devops, make, makefile
updated: "2021-03-19"
draft: true
---

Have you ever found yourself writing over and over again the same command? Be it: `docker-compose up`, `python manage.py runserver`, etc.?

I have, and at first I started automating them using bash scripts (which is not that bad an idea when it's a combination of commands, but soon you find with at most one bash script for every single command you wish to run.

Of yourse you could also make one big bash script and use an argument parser to parse a command and with one script handle all commands you need, adding more as needed.

However, the lazy dev in me soon started to wonder if there was a better way. _And there is, Kevin!_

[GNU Make](https://www.gnu.org/software/make/) is a tool that helps in the process of building software out of their source files. It reads a `Makefile` that lists the file or files that need to be built and the steps to build them.

So how can we use this tool if we're not really compiling software, only just running some commands? By making use (and abuse?) of the [Phony Targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html#Phony-Targets). These define rules on a `Makefile` that are actually just commands to be run and do not generate any file (they don't _make_ anything new).

So for instance when working on a Django project that's using Docker, my `Makefile` starts to look like this:

```Makefile
.PHONY: migrate migrations shell

migrations:
    docker-compose -f docker-compose.yml run --rm django
    python manage.py makemigrations

migrate:
    docker-compose -f docker-compose.yml run --rm django python manage.py migrate

shell:
    docker-compose -f docker-compose.yml run --rm django python manage.py shell
```

You can then can start to simplify it a bit using variables to stop repeating yourself:

```Makefile
.PHONY: migrate migrations shell

DJANGO_RUN_CMD = docker-compose -f docker-compose.yml run --rm django python manage.py

migrations:
    $(DJANGO_RUN_CMD) makemigrations

migrate:
    $(DJANGO_RUN_CMD) migrate

shell:
    $(DJANGO_RUN_CMD) shell
```

And perhaps you are so lazy you want to make migrations and migrate at the same time. You can reference other rules to be run before a specific one by specifying them on the first line.

```Makefile
.PHONY: migrate migrations shell

DJANGO_RUN_CMD = docker-compose -f docker-compose.yml run --rm django python manage.py

migrations:
    $(DJANGO_RUN_CMD) makemigrations

migrate: migrations
    $(DJANGO_RUN_CMD) migrate

shell:
    $(DJANGO_RUN_CMD) shell
```

This time, every time you run `make migrate`, it will first run the `migrations` rule and then the commands for the migrate rule.
