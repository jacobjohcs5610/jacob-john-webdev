module.exports = function(mongoose){

    var TopicSchema = require("./topic.schema.server")(mongoose);


    var TopicModel = mongoose.model("TopicModel",TopicSchema);


    var api={
        createTopicForUser: createTopicForUser,
        findAllTopicsForUser: findAllTopicsForUser,
        findTopicById: findTopicById,
        updateTopic: updateTopic,
        deleteTopic: deleteTopic,
        findAllTopics: findAllTopics
    }

    return api;

    function createTopicForUser(userId, topic){

        return TopicModel.create(topic);
    }

    function findAllTopicsForUser(user){

        return TopicModel.find({_user: user});
    }

    function findAllTopics(){
        return TopicModel.find({});
    }

    function findTopicById(topicId){
        return TopicModel.find({_id: topicId});
    }

    function updateTopic(topicId, topic){
        return TopicModel.update({_id: topicId},
            {
                name: topic.name,
                description: topic.description
            });
    }

    function deleteTopic(topicId){
        return TopicModel.remove({_id: topicId});
    }



};
