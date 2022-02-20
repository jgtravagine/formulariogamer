function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;

}
$(document).ready(function() {
    document.getElementById("experienciaForms").value = xp;
    $("#cpfPessoa").focus(function() {
        $(this).mask('000.000.000-00');
    });

    $("#telefonePessoa").focus(function() {
        $(this).mask('(00)00000-0000');
    });

    $("#cepPessoa").focus(function() {
        $(this).mask('00000-000');
    });



    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#enderecoPessoa").val("");
        $("#bairroPessoa").val("");
        $("#cidadePessoa").val("");
        $("#estadoPessoa").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cepPessoa").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#enderecoPessoa").val("...");
                $("#bairroPessoa").val("...");
                $("#cidadePessoa").val("...");
                $("#estadoPessoa").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#enderecoPessoa").val(dados.logradouro);
                        $("#bairroPessoa").val(dados.bairro);
                        $("#cidadePessoa").val(dados.localidade);
                        $("#estadoPessoa").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        $("#cepPessoa").val("");
                        $("#textoAlerta").text("CEP NÃO ENCONTRADO");
                        $('#myModal').modal('show');

                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                $("#cepPessoa").val("");
                $("#textoAlerta").text("CEP INVÁLIDO");
                $('#myModal').modal('show');
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
    $("#confirmasenha").blur(function() {
        var pass1 = $("#senhaPessoa").val();
        var pass2 = $(this).val();
        if (pass2 !== pass1) {
            $("#textoAlerta").text("SENHAS NÃO SÃO IGUAIS");
            $('#myModal').modal('show');
            $(this).val("");
        }
    });
    $("#cpfPessoa").blur(function() {
        var resultado = "";
        var strCPF = $(this).val().replace(/\D/g, '');
        resultado = TestaCPF(strCPF);
        if (resultado != true) {
            $(this).val("");
            $("#textoAlerta").text("CPF INVÁLIDO");
            $('#myModal').modal('show');
        }
    });
    rangeCss();
    var nome = "";
    $(".form-control").blur(function() {
        if (($(this)).is(":valid")) {
            adicionarLevel($(this));
            $(this).removeClass("form-error");
            $(this).addClass("form-acepted");
        } else {
            $(this).removeClass("form-acepted");
            $(this).addClass("form-error");
        }
    });

});

function rangeCss() {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
}
var level = 0;
var xp = 0;
var input_status = "";

function adicionarLevel(input_name) {
    if ((input_name).is("#nomePessoa") && !(input_status.includes("a"))) {
        $("#xpNome").fadeIn();
        $("#xpNome").fadeOut("slow");
        xp = xp + 9;
        input_status = input_status + "a";
    } else if ((input_name).is("#emailPessoa") && !(input_status.includes("b"))) {
        $("#xpEmail").fadeIn();
        $("#xpEmail").fadeOut("slow");
        xp = xp + 9;
        input_status = input_status + "b";
    } else if ((input_name).is("#cpfPessoa") && !(input_status.includes("c"))) {
        $("#xpCpf").fadeIn();
        $("#xpCpf").fadeOut("slow");
        xp = xp + 10;
        input_status = input_status + "c";
    } else if ((input_name).is("#senhaPessoa") && !(input_status.includes("d"))) {
        $("#xpSenha").fadeIn();
        $("#xpSenha").fadeOut("slow");
        xp = xp + 12;
        input_status = input_status + "d";
    } else if ((input_name).is("#confirmasenha") && !(input_status.includes("e"))) {
        $("#xpSenha2").fadeIn();
        $("#xpSenha2").fadeOut("slow");
        xp = xp + 12;
        input_status = input_status + "e";
    } else if ((input_name).is("#telefonePessoa") && !(input_status.includes("f"))) {
        $("#xpTelefone").fadeIn();
        $("#xpTelefone").fadeOut("slow");
        xp = xp + 8;
        input_status = input_status + "f";
    } else if ((input_name).is("#cepPessoa") && !(input_status.includes("g"))) {
        $("#xpCep").fadeIn();
        $("#xpCep").fadeOut("slow");
        xp = xp + 50;
        input_status = input_status + "g";
    }
    $("#experienciaForms").val(xp);
    rangeCss();
    if (xp > 99) {
        xp = 0;
        level = level + 1;
        $("#rangeLevelFirst").val(level);
        $("#rangeLevelSecond").val(level + 1);
        $("#experienciaForms").val(xp);
        rangeCss();
    }
}