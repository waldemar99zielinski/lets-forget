#DATABASE

#mongodb
k8s_yaml('./development/kubernetes/mongo.yaml')
k8s_resource('mongodb', port_forwards='9000:27017')

#postgresql

k8s_yaml('./development/kubernetes/postgres.yaml')
k8s_resource('postgresql', port_forwards='9001:5432')

#Maildev

k8s_yaml('./development/kubernetes/maildev.yaml')
k8s_resource('maildev', port_forwards=['1080', '1025'])