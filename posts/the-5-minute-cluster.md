---
title: The 5 Minute Cluster
author: Rodrigo E. Gimenez
authorLink: https://github.com/rodrigoegimenez
date: "2020-09-29"
keywords: docker, ansible, devops
firstOn: https://dev.to/rodrigoegimenez/the-5-minute-cluster-1oih
---

```bash
ansible-playbook -i hosts swarm-bootstrap.yml  \
    61,38s user 14,61s system 25% cpu 5:00,57 total
```

Being a DevOps enthusiast I am always looking forward to testing and studying new tech as I discover them. On top of that being a Linux user for more than 20 years has made me savvy to know how stuff work to the very basic.

This time I wanted to build and play around with a docker-powered cluster. Initially the idea was to play around with Kubernetes but it's a beast I am yet to tame. So I moved to a simpler solution: docker swarm.

Inspired by [Docker Swarm Rocks](https://dockerswarm.rocks/) site and a [Digital Ocean's Guide](https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-ubuntu-18-04), I created a set of [ansible](https://github.com/ansible/ansible) playbooks that automate the process of installing and configuring the cluster including [Traefik](https://traefik.io/traefik/) as reverse proxy, [Portainer](https://www.portainer.io/) as container manager and [Jenkins](https://www.jenkins.io/) as an automation server.

To run this you will need, first, a set of Linux Servers (VM or Bare Metal). You should have ansible installed, and ssh access to each of these servers. In my case I used Google Cloud Platform's Instances to do all the testing.

Once you have all your servers set up, including ssh access to them, clone the [repo](https://github.com/rodrigoegimenez/ansible-docker-swarm-cluster) to your local machine,

```bash
git clone https://github.com/rodrigoegimenez/ansible-docker-swarm-cluster.git
cd ansible-docker-swarm-cluster
```

Add your servers info to the `hosts` file, and finally run the main playbook,

```bash
ansible-playbook -i hosts swarm-bootstrap.yml
```

sit back and relax. When installing the services ansible will ask you questions like the domain to use (ie. traefik.yoursite.com) and credentials for some of these services. Make sure you are pointing these domains to the master node of your cluster.

In 5 minutes you'll have your cluster up and running and ready to deploy more and more services to.

That's it!

<!-- <small><span>Photo by <a href="https://unsplash.com/@tumbao1949?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">James Wainscoat</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></small> -->
