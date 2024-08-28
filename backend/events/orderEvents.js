import EventEmitter from 'events';

class OrderEmitter extends EventEmitter {}
const orderEmitter = new OrderEmitter();

orderEmitter.on('orderStatusUpdated', (orderId, newStatus) => {
    console.log(`Order ${orderId} status updated to ${newStatus}`);
});

export default orderEmitter;
