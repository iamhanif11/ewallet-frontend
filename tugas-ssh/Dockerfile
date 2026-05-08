FROM ubuntu:latest

RUN apt-get update && apt-get install -y openssh-server && mkdir /var/run/sshd

RUN useradd -m -s /bin/bash iamhanif11

RUN mkdir -p /home/iamhanif11/.ssh

COPY keys_iamhanif11.pub /home/iamhanif11/.ssh/authorized_keys

RUN chown -R iamhanif11:iamhanif11 /home/iamhanif11/.ssh && chmod 700 /home/iamhanif11/.ssh &&  chmod 600 /home/iamhanif11/.ssh/authorized_keys

RUN sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config && sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config && sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]