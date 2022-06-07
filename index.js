var PUTAPUTA = function() {
    this.Iniciar = function() {
        document.getElementById('Inici_Codificar').addEventListener('click', function() { 
            puta.ElementVisible('Inici', false);
            puta.ElementVisible('Codificar', true);
            puta.ElementVisible('TornarInici', true);
            puta.ElementVisible('Finestra_Missatge', false);
        });
        document.getElementById('Inici_DesCodificar').addEventListener('click', function() { 
            puta.ElementVisible('Inici', false);
            puta.ElementVisible('DesCodificar', true);
            puta.ElementVisible('TornarInici', true);
            puta.ElementVisible('Finestra_Missatge', false);
//            puta.Descodificar();
        });
        document.getElementById('Inici_Test').addEventListener('click', function() { 
            puta.ElementVisible('Inici', false);
            puta.ElementVisible('Test', true);
            puta.ElementVisible('TornarInici', true);
            puta.ElementVisible('Finestra_Missatge', false);
        });
        
        document.getElementById('TornarInici').addEventListener('click', function() { 
            puta.MenuInicial();
        });
        
        document.getElementById('Input_Descodificar').addEventListener('paste', function(e) {
//            e.preventDefault();
            setTimeout(function(){ puta.PUTAaASCII("Input_Descodificar", "Input_Descodificar"); }, 100);
        });
        
        document.getElementById('Buto_Missatge').addEventListener('click', function() { 
            puta.OcultarMissatge();
        });
            

        document.getElementById('DictarCodif').addEventListener('input', function() { 
            localStorage.setItem("DictarCodif", document.getElementById("DictarCodif").checked);
        });
        document.getElementById('DictarDecodif').addEventListener('input', function() { 
            localStorage.setItem("DictarDecodif", document.getElementById("DictarDecodif").checked);
        });
            

        // Localstorage
        var IDC = localStorage.getItem("DictarCodif");
        var IDD = localStorage.getItem("DictarDecodif");
        if (IDC !== null) {
            if (IDC == "true") document.getElementById("DictarCodif").checked = true;
        }
        if (IDD !== null) {
            if (IDD == "true") document.getElementById("DictarDecodif").checked = true;
        }

        this.MenuInicial();
    };
    
    this.ElementVisible = function(IDElement, Valor) {
        var Element = document.getElementById(IDElement);
        if (Valor === true) { Element.setAttribute("visible", true);        }
        else                { Element.removeAttribute("visible");           }
    };
    
    this.MenuInicial = function() {
        this.ElementVisible('Inici', true);
        this.ElementVisible('Codificar', false);
        this.ElementVisible('DesCodificar', false);
        this.ElementVisible('Test', false);
        this.ElementVisible('TornarInici', false);        
    };
    
    // Funció del buto Codificar
    this.Codificar = function() {
        if (document.getElementById('Input_Cristia2').value !== "") {
            puta.ASCIIaPUTA("Input_Cristia2", "Input_Cristia2");
            document.getElementById('Input_Cristia2').value = "";
            this.MenuInicial();
        }
        else {
            this.MostrarMissatge("Escriu un texte per codificar.");
        }
    };
    
    this.Descodificar = function() {
        document.getElementById('Input_Descodificar').value = "";
//        puta.PUTAaASCII("Input_Descodificar", "Input_Descodificar");
        setTimeout(function(){ puta.PUTAaASCII("Input_Descodificar", "Input_Descodificar"); }, 100);
    };
    
    
    this.CaractersASCII = [
        // Caracters
        'a', 'à', 'á', 'ä', 'A', 'À', 'Á', 'Ä', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'è', 'é', 'E', 'È', 'É', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'ì', 'í', 'ï', 'I', 'Ì', 'Í', 'Ï',
        'j', 'J', 'k', 'K', 'm', 'M', 'n', 'N', 'l', 'L', 'o', 'ò', 'ó', 'ö', 'O', 'Ò', 'Ó', 'Ö', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'ù', 'ú', 'ü', 'U', 'Ù',
        'Ú', 'Ü', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', 'ç', 'Ç', 'ñ', 'Ñ', ' ', 
        // Numeros
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        // Simbols
        'º', 'ª', '!', '¡', '"', '@', '·', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '<', '>', '`', '^', '[', ']', '+', '*', '´', '¨', '{', '}', "'", ',', ';', ':', '.', '-', '_', '\\',
        '\n'
        // TOTAL 132
    ];

    //            var CaractersPUTA = [ 'p', 'u', 't', 'a', 'P', 'U', 'T', 'A', ' ' ];

    this.Rand = function(Max, Min) {
        var min = (typeof(Min) !== "undefined") ? Min : 0; // Si no se especifica el mínimo por defecto es 0
        var max = (typeof(Max) !== "undefined") ? Max : 1; // Si no se especifica el máximo por defecto es 1
        return min + Math.random() * (max - min);    
    };

    this.RandInt = function(Max, Min) {
        return Math.round(this.Rand(Max, Min));
    };

    function BuscarCaracter(Caracter, Array) {
        for (var i = 0; i < Array.length; i++) {
            if (Array[i] === Caracter) { 
                return i;
            }
        }
        return -1;
    };

    // Converteix un valor decimal a un array de 8 bits
    this.DECaBIN = function(Valor) {
        var Ret = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
        var Val = Valor.toString(2);
        var Contador = 7;
        for (var i = Val.length - 1; i > -1; i--) {
            Ret[Contador --] = (Val.charAt(i) === '0') ? 0 : 1;
        }
        return Ret;
    };

    // Converteix un string binari a un valor enter
    this.BINaDEC = function(Valor) {
        return parseInt(Valor, 2);
    };


    // Codifica un texte ASCII a PUTA
    this.ASCIIaPUTA = function(InputO, InputD) {
        var Texte = document.getElementById(InputO).value;
//        var Texte = document.getElementById('Input_Cristia').value;
        var Resultat = "";
        var Bin = [];

        for (var i = 0; i < Texte.length; i++) {
            var char = BuscarCaracter(Texte.charAt(i), this.CaractersASCII);
            if (char > -1) {
                Bin.push.apply(Bin, this.DECaBIN(char));
            }
        }


        var TARet = document.getElementById(InputD);
        // La idea es enviar el link per descodificar, peró puc fer que s'envï la frase codificada amb el mateix link, o haig de fer que facin un paste? (desde perspectiva watsupp
        //      - Si es pogues fer em temo que sortiria la variable a pasar que seria iguual o mes llarga que el missatge encriptat (una cosa es facilitat, i unaltre spam, que a mes m'haure de currar una frase curta... no sigui que el missatge tingui limit de caracters...)
        TARet.value = this.TxtPuta(Bin);
        TARet.select();
        try {
            document.execCommand('copy');
            this.MostrarMissatge("Texte codificat guardat al porta papers.");            
        }
        catch(err) {
            console.log("error en el Control+C", err);
        }

        if (document.getElementById("DictarCodif").checked === true) {
            var TextoDictado = new SpeechSynthesisUtterance(TARet.value);
            TextoDictado.lang = 'ca'
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(TextoDictado);
        }
    };

    this.TxtPuta = function(ArrayBinario) {
        // Total caracteres a codificar sin contar espacios extra entre puta y puta
        var TotalCaracteres = ArrayBinario.length;
        // Total de palabras puta en el texto
        var NumPutas = this.RandInt(Math.floor(TotalCaracteres / 4), 1);
        // Contador de caracteres variables restantes
        var CaracteresRestantes = TotalCaracteres - (NumPutas * 4);

        var Resultado = "";
        var Pos = 0;
        // por cada palabra puta (la 'u' t la 'a' se pueden repetir más de una vez
        for (var p = 0; p < NumPutas; p++) {
            Resultado += ((ArrayBinario[Pos++] === 0) ? 'p' : 'P');
            // Si (CaracteresRestantes / NumPutas) es menor que 1, debe ser 1.
            var Rnd = this.RandInt(Math.floor(CaracteresRestantes / NumPutas), 0);
            CaracteresRestantes -= Rnd;
            for (var i = 0; i < Rnd + 1; i++) {
                Resultado += ((ArrayBinario[Pos++] === 0) ? 'u' : 'U');
            }
            Resultado += ((ArrayBinario[Pos++] === 0) ? 't' : 'T');
            Rnd = this.RandInt(Math.floor(CaracteresRestantes / NumPutas), 0);
            CaracteresRestantes -= Rnd;
            for (var i = 0; i < Rnd + 1; i++) {
                Resultado += ((ArrayBinario[Pos++] === 0) ? 'a' : 'A');
            }

            if (p < NumPutas - 1) {
                Resultado += ' ';
            }
        }
        // Sempre queda minim un caracter restant... raro raro... sembla cosa de fer RandInt(1,0) que sempre dona 0...
        for (var i = 0; i < CaracteresRestantes; i++) {
            Resultado += ((ArrayBinario[Pos++] === 0) ? 'a' : 'A');
        }

        //console.log(CaracteresRestantes);
        return Resultado;
    };


    // Descodifica un texte PUTA i mostra el ASCII
    this.PUTAaASCII = function(InputO, InputD) {
        var Texte = document.getElementById(InputO).value;
//        var Texte = document.getElementById('Input_Putificacio').value;
        var Resultat = "";
        var Bin = "";
        for (var i = 0; i < Texte.length; i++) {
            var char = Texte.charAt(i);
            if (char === 'p' || char === 'u' || char === 't' || char === 'a') {
                Bin += "0";
            }
            else if (char === 'P' || char === 'U' || char === 'T' || char === 'A') {
                Bin += "1";
            }

            if (Bin.length > 7) {
                Resultat += this.CaractersASCII[this.BINaDEC(Bin)];
                Bin = "";
            }
        }

        // Selecciono tot el texte del input
        var TARet = document.getElementById(InputD);
        TARet.value = Resultat;
        TARet.select();

        if (document.getElementById("DictarDecodif").checked === true) {
            // Faig el text to speech
            var TextoDictado = new SpeechSynthesisUtterance(Resultat);
            TextoDictado.lang = 'ca'
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(TextoDictado);
        }
        
    };

    // Funció per mostrar un missatge
    this.MostrarMissatge = function(Missatge) {

        document.getElementById("Missatge").innerHTML = Missatge;
        document.getElementById("Finestra_Missatge").setAttribute("visible", "true");
    };

    // Funció per ocultar el missatge
    this.OcultarMissatge = function() {
        document.getElementById("Finestra_Missatge").removeAttribute("visible");
    };

};

var puta = null;
window.addEventListener('load', function() {
    puta = new PUTAPUTA; 
    puta.Iniciar();
});