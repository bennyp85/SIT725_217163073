const cardList = [
    {
        title: "Local Z Feature Map",
        image: "images/feature_local_z.png",
        description: "Applies local Z rotations to each qubit based on the input value."
    },
    {
        title: "Feature Reuploading",
        image: "images/feature_reuploading.png",
        description: "Re-encodes the same inputs multiple times to increase expressiveness."
    },
    {
        title: "Feature ZZ Interaction",
        image: "images/feature_zz_interaction.png",
        description: "Encodes qubit-qubit correlations by adding ZZ rotations between neighbors."
    }
];

const addCards = (items) => {
    const cardsArea = $("#card-section");
    cardsArea.empty();
    items.forEach(item => {
        const cardLink = item.link || "#";
        const cardDescription = item.description || "Description coming soon.";
        const itemToAppend = '<div class="col s12 m6 l4 center-align">'+
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span></div>'+
            '<div class="card-reveal">'+
            '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
            '<p class="card-text">'+cardDescription+'</p>'+
            '</div></div></div>';
        cardsArea.append(itemToAppend);
    });
};

const showCardsOnImageClick = () => {
    $("#cards-section").show();
    addCards(cardList);
};

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $("#cards-section").hide();
    $("#bloch-image").on("click", showCardsOnImageClick);
});
