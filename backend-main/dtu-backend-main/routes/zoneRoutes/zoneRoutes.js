const express = require('express');
const ZoneRouter = express.Router();
const { User, Event } = require('../../db');



ZoneRouter.get('/changeZone', async(req, res)=>{
    let { qrcodeinfo, toZone, eventId } = req.body;
    const zoneNameSchema = z.string().min(1);
    if(!zoneNameSchema.safeParse(toZone).success){
        return res.status(404).json({'message': 'Zone does not exist'});
    }

    try{
        const event = await Event.findOne({_id: eventId});
        if(!event){
            return res.status(404).json({'message': 'Invalid event'});
        }
        
        if(event.nodes.indexOf(toZone) < 0){
            return res.status(404).json({'message': 'Unknown zone'});
        }
        let users = await User.find({});
        
        let found = false;
        let currentUser = undefined;
        users.forEach((user)=>{
            console.log("Current User: "+ user);
            user.events_subscribed.forEach((event)=>{
                let eventKey = Object.keys(event)[0];
                if(eventKey === eventId && event[eventKey] === qrcodeinfo){
                    console.log(Object.keys(event)[0]);
                    found = true;
                }
            })
            
            if(found){
                currentUser = user; 
            }
        })
    
        
        if(!found){
            return res.status(404).json({'message': 'Not subscribed to the event'});
        }
        
        currentUser.events_subscribed.forEach((item)=>{
            if(Object.keys(item)[0] === eventId){
                item.location = toZone;
            }
        })

        const toUpdateUser = await User.findOne({email: currentUser.email});
        toUpdateUser.events_subscribed = currentUser.events_subscribed;
        await toUpdateUser.save();
        res.status(200).json({'message': 'Updated Location'});
    }catch(error){
        res.status(404).json({'message': 'Internal Server Error '+ error});
    }
})

module.exports = ZoneRouter;