# DEPRECATED
# NEED REFACTOR

FROM archlinux:20200306

LABEL mantainer="Thiago Sant' Helena <thiago.sant.helena@gmail.com>"

# Copy files into image
COPY src/ src/
COPY requirements.txt requirements.txt

RUN pacman -Sy python cronie python-pip --noconfirm

RUN systemctl enable cronie

# Install requirements with pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 80/tcp

WORKDIR src/

# RUN apt-get update && apt-get -y install cron
RUN flask crontab add
# RUN service cron start

WORKDIR /

CMD crond && gunicorn src.app:application