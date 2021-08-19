import interact from "interactjs";
import './Drag.css';

function Drag() {
    const dragMoveListener = (event) => {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
      
        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
      
        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
    
        // listen for drop related events:
    
        ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target
    
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: function (event) {
            var target = event.dragEvent.currentTarget
            // translate the element

            if (event.target.id === 'wrong-dropzone') {
                target.classList.add('animate-transform')
                setTimeout(()=>{
                    target.classList.remove('animate-transform')
                }, 0.5)
                target.style.transform = 'translate(0px,0px)'
                target.setAttribute('data-x', 0)
                target.setAttribute('data-y', 0)
                
                event.target.classList.remove('drop-target')
                event.relatedTarget.classList.remove('can-drop')
                event.relatedTarget.textContent = 'Dragged out'
            } else {
                target.remove();
            }
            
        
            //event.relatedTarget.parentNode.removeChild(event.relatedTarget)
           
        },
        ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
        }
    })
    
    interact('.drag-drop')
        .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
            })
        ],
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        listeners: { move: dragMoveListener }
    })

    return (
        <div className="Drag">
            <div id="no-drop" className="drag-drop"> #no-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="yes-drop" className="drag-drop"> #yes-drop </div>
            <div id="correct-dropzone" className="dropzone"> #correct-dropzone</div>
            <div id="wrong-dropzone" className="dropzone"> #wrong-dropzone</div>
        </div>
    );
}

export default Drag;