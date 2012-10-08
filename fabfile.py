from fabric.api import env, local, run, cd, sudo

def vagrant():
    env.user = 'vagrant'
    env.hosts = ['127.0.0.1:2222']
    result = local('vagrant ssh-config | grep IdentityFile', capture=True)
    env.key_filename = result.split()[1]
    env.install_dir = "/vagrant/"
    env.activate = "source bin/activate"

def virtualenv(command):
    with cd(env.install_dir):
        run(env.activate + '&&' + command)

def aptget(package):
	sudo("apt-get -y install %s" % package)

def pip(package):
	virtualenv("pip install %s" % package)

def pip_noenv(package):
	sudo("pip install %s" % package)	

def pythonbasics():
	aptget("curl")
	aptget("python-setuptools")
	aptget("python-dev")
	aptget("build-essential")
	aptget("git-core")
	#ubuntu's pip is ancient, install the new version
	with cd('/tmp'):
		run("curl -O http://pypi.python.org/packages/source/p/pip/pip-1.0.tar.gz")
		run("tar xvfz pip-1.0.tar.gz")
		with cd("pip-1.0"):
			sudo("python setup.py install")
	sudo("pip install virtualenv")

def beautifulsoup():
	aptget("libxml2")
	aptget("libxml2-dev")
	aptget("libxslt-dev")

def appreqs():
	with cd(env.install_dir):
		virtualenv("pip install -r requirements.txt")


def buildenv():
	sudo("apt-get update")
	aptget("byobu")
	pythonbasics()

	pip_noenv("virtualenv")

	with(env.install_dir):
		run("virtualenv .")
		run("virtualenv . --no-site-packages")

	appreqs()

