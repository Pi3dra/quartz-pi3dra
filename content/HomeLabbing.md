
# Why? 

I have chosen to start home labbing for multiple reasons, from learning more about networking, servers, virtualization etc, but also, to try and store and manage my data and media locally, in a dystopian world where everyone and there mum are out there tracking your data, and how you use your media.

This was highly motivated by the youtuber Louis Rossman (https://www.youtube.com/channel/UCl2mFZoRqjw_ELax4Yisf6w) An independent electronics technician, YouTuber, and consumer rights activist. and his FUTO guide for a self managed lifestyle : https://wiki.futo.org/index.php/Introduction_to_a_Self_Managed_Life:_a_13_hour_%26_28_minute_presentation_by_FUTO_software.

## The software I will use: 
- Proxmox as an Hypervisor.
- TrueNAS, as a... NAS.
- Immich as a gallery and image backup service.
-  Some replacement for Google Docs, not yet decided.
- Pfsense, as a router, to use openvpn and avoid port forwarding.

## The Hardware I am Using:
- An old repurposed HP Z230 SFF workstation
- 4 500Gb 2.5" HDD ( I don't need a shit ton of storage, I think)
-  1 250gb SSD
- An NVIDIA 1030 GPU (Isn't really needed but I have it)

Even though his tutorials are really awesome, I am restrained on budget, and he uses multiples PCs for his setup, So I will be improvising to do everything in one PC.

## The Good:
- Ideal for experimenting, learning, and building a home lab.
- I decide which software to run, which versions, and how it’s configured.
- No restrictions from third-party providers.
- Cost savings (long term)
- Privacy
- I would be inclined to say security, but I don't have the balls to say that I host services better than google, and I proably never will.
## The Bad and The Ugly::
- **Hardware dependency**, Everythins is in a single PC, if this PC dies, all the stored data and WiFi routing dies, which is also a security risk, but hey it's for learning purposes.

- **Power and cooling**, Even if the HDDs Are 2.5"" for lesser power consumption, the goal would be to provide accounts to all my family and friends, to save them from google drive and google docs, and make it more cost efficient

- **Networking complexity** The WorkStation only has one physical NIC, so I would either need to buy an extra network adapter, or I should do some VLAN sorcery, we'll see later

- **Maintenance & updates** I  must manage OS updates, Proxmox updates, security patches, and backups myself.


For all the reasons mentioned above and many more, I do not take responsability if you choose to follow my path, self hosting isn't for the faint of heart, and this is my very first home lab, which will be highly educational, and experimental.

Thus these notes are more a reminder for my future self, in case I screw something up so bad that backups won't save me.



# Installing Proxmox.

Installing proxmox is as straightforward as installing any other OS, go to their website  https://www.proxmox.com/en/,  download the **.iso** file, flash it in a USB stick with the program of your preference(BalenaEtcher,  Ventoy, dd , etc..) plug it in, boot the pc and follow the instructions setting up everything as you go.

In case you are lazy like me and choose an IP without checking that it isn't already in use by your router, this might come in handy:

while logged to the machine, either by ssh or a keyboard n screen:
```
nano /etc/network/interfaces #Then change your IP here, save and exit
systemctl restart networking 
```


## General Configurations

These are steps that need to be taken to harden the security of all the systems and VMS

1. No Default Usernames !
2. Setting up notifications


## Setting up

### Updates

To update proxmox packages, click on you proxmox machine hostname in the left bar, then the **updates/repositories**, click and disable the ones with **entreprise** in the URL, Add a no subscription repository.

Note: You can choose between a Ceph Non-commercial repo, or just a Non-Commercial, for our purposes we won't use Ceph, as it seesm to be used for more complex tasks and proxmox clusters, which is overkill in our case.

Then go to **updates** click on refresh, and then upgrade.

### Notifications

To enable notifications, we go to `datacenter > notifications`

We select SMTP for Simple Mail Transfer Protocol.

I will set it up to send stuff to my gmail, so I basically filled the following fields:

- Server : smtp.gmail.com
- Encryption : StartTLS

For the username and password we need to create an app password on our google account.
We can get an app password like so: 
https://myaccount.google.com/apppasswords
ieft ppum ierm fwld

the from address and username field are the same, and the recipient should be root@pam.

Now we can click on the **Test** button on the top bar and we should receive a mail to our gmail.

Now the get, all notifications, we go to the **Notification Matchers** and add our gmail setup, and uncheck the `mail-to-root`  in the **targets to notify subsection**


### PCI Passthrough
https://pve.proxmox.com/wiki/PCI_Passthrough
This allows to use physical PCI devices (GPU,  Network Card, etc) inside VMs.

When using PCI passthrough on a VM, don't forget to go to `System > Machine` and set to `q35`

### Storage and backups, Do truenas first
https://pve.proxmox.com/pve-docs/chapter-vzdump.html
When installing windows machine, ensure to install virtio, alwways enable Qemu Agent, and also install the qemu-quest-agetn on the vm.

This will be set-up later, as I have a single machine, backups will only protect me from user-error and misbehaving VMs, but not the really scary stuff like hardware failure and catastrophic events like a fire.

## A 3-2-1 backup includes:

total copies of your data, including the original files. This includes 1 offsite copy and 2 local copies.

local copies on different devices. This includes the main files and a backup of those files locally.

offsite copy in the cloud or at another physical location.


### Best practices and misc





# Installing TrueNas

I basically followed this video : https://www.youtube.com/watch?v=M3pKprTdNqQ&t=345s


IMPORTANT: Don't forget to check `Network > Global Configuration` to set up a **DNS** address and properly have access to internet.


The idea now is to use TrueNAS solely as the 


I might want to add 3 datasets: One for random documents like google drive, another for images, and another one for backups.

### Notifications

Go to `Credentials > your_user` and click on `Edit` then add your email.

Then click the Alerts bell on the top bar, go to `Settings > Email`

You can either manually setup `SMTP` alerts, but I did it using  `GoogleOAuth`

### Storage

TODO: Explain how to use, SHARES, and what wheel does and stuff.

# Installing Immich
https://community-scripts.github.io/ProxmoxVE/scripts?id=immich&category=Media+%26+Streaming

Explain what you did lol j
