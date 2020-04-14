pipeline {
    agent any
    options {
        timeout(time: 2, unit: 'MINUTES' )
    }

    stages {
	stage('Pulling kanvas-image-resizer') {
	    steps {
		sshagent(['kanvas-image']) {
		    sh 'ssh -tt kanvas-image git pull ./kanvas-image-resizer/'
		    }
	        }
	    }
    
       stage('Starting kanvas-image-resizer') {
	    steps {
                sshagent(['kanvas-image']) {
                    sh 'ssh -tt kanvas-image docker-compose -f kanvas-image-resizer/docker-compose.yml up -d --build'
                }
            }
        }
    }
}
