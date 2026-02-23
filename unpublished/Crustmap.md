To understand better how tools like Nmap work or in this case, Crustmap, It can be interesting to have more insight on the **TCP/IP** model, Which can be seen as a practical and reduced implementation of the  **OSI** model


TCP/IP Model  to OSI Model

| TCP/IP                | OSI                                                      |
| --------------------- | -------------------------------------------------------- |
| 1.Application Layer   | Application Layer<br>Presentation Layer<br>Session Layer |
| 2.Transport Layer     | Transport Layer                                          |
| 3.Internet Layer      | Network Layer                                            |
| 4.Network Acces Layer | Data Link Layer <br>Physical Layer                       |

## Application Layer
This layer is the one that provides network services to applications directly.

Most protocols run on this layer like:
- HTTP/HTTPS
- FTP
- SMTP
- DNS
- NTP

## Transport Layer
This layer provides ent-to-end communication, reliability and flow control

with the well known protocols:
- TCP (Transmission Control)
- UDP (User Datagram)
- SCTP (Stream Control Transmission)

## Internet Layer
This layer provies the routing and forwarding of packets across networks.

with also very well known protocols:
- IP (Internet Protocol)
- ICMP (Internet Control Message Protocol)
- IGMP (Internet Group Management Protocol)
- IPsec - Security protocols for IP layer

## Link Layer
This layer Handles physical transmission of data and hardware adressing

with the protocols:
- Ethernet
- Wi-FI
- ARP
- PPP
- Frame Relay 
- DSL, ISDN

## Data flow through this stack

Each layer only talks to  either the layer directly above and the layer directly below it

so for example if and application running by a client sends a request to a server,
it would go something like this:



| Client                      | Server                       |
| --------------------------- | ---------------------------- |
| Application<br>         ↓   | Application<br>          ↑   |
| Transport<br>         ↓     | Transport<br>          ↑     |
| Internet<br>         ↓      | Internet<br>          ↑      |
| Network Acces<br>         ↓ | Network Acces<br>          ↑ |
| `      →     `              | `      ↑ `                   |

When information is sent downwards through the stack each layer encapsulates the packet with information pertaining to the layer, and when information moves upwards the paquets decapsulates the information corresponding to their layer.

This is the power of the TCP/IP model, it breaks down tasks into multiple sub-task, in which every layer is only concerned by specific tasks.


## Relation with Nmap:

All nmap work happens mainly in the **Transport** and **Internet** Layers.

more specifically in the: **TCP, UDP, IP, ICMP** protocols
### Host Discovery
Source: https://nmap.org/book/man-host-discovery.html

Nmap doesn't go balls to the wall scanning, First it does host discovery, If given a list , or a single target, nmap always verifies first if the host is up (unless specified otherwise).

This prevents flooding the network sending unecessary packages, which makes the tool more efficient, but most importantly stealthier.

By default Nmap first test the following probes:
- **ICMP** **echo** request (ping)
- **TCP SYN** to port 443
- **TCP ACK** to port 80 
- **ICMP timestamp** request

but for unpriviliged unix shell users the default probes are:
- **TCP SYN** to port 80 and 443

(the **ICMP timestamp** is not implemented in crustmap , because this feature is very rearely used (legacy))
to understand better what this means we need to dive a bit deeper into the **ICMP** and **TCP** protocols.


#### ICMP Protocol

Source: https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol
The **ICMP Protocol** as seen above is part of the **Internet Layer**, It is used by devices to send error messages and operational information indicating succes or failure when communicating with another IP address.

These messages are used mainly for diagnostic and control or as errors to **IP** operations.

an ICMP header has the following format:

Octet -> 8 bits

| Octet | 0    | 1    | 2       | 3        |
| ----- | ---- | ---- | ------- | -------- |
| 0     | Type | Code | Cheksum | Checksum |
| 4     | Rest | of   | Header  | ...      |

So basically it has:

32 bits with information on the type of **ICMP message** and 32 more bits with extra information depending on the type of message.

We are interested in the **echo request** message not the **echo reply**.

so to ping a machine we have to craft a package,
which would have, the type set to 8 and code to 0, for the **echo** messages the **"Rest of Header"** would be split into two: **Identifier + Sequence Number**.

the **Sequence number** which increments with each reaquest, and the **Identifier** used to match requests/replies that way we know which pings got answered.
