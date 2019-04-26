$(function () {

    var h = $(".dashboard-header").css('height');
    if (h != "51px") {
        $(".sidebar-toggler").trigger("click");
    }
    var startDateTextBox = $('#date_from');
    var endDateTextBox = $('#date_to');

    startDateTextBox.datepicker({
        minDate: "01/01/2013",
        maxDate: 0,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        onClose: function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datepicker('setDate', testStartDate);
            } else {
                endDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
        }
    });
    endDateTextBox.datepicker({
        minDate: "01/01/2013",
        maxDate: 0,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        onClose: function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datepicker('setDate', testEndDate);
            } else {
                startDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
        }
    });
});

$(document).ready(function () {
  var h = $(".dashboard-header").css('height');
    if (h != "51px") {
        $(".sidebar-toggler").trigger("click");
    }
    })

$("#from_month_sel").change(function () {

    $.ajax({
        type: "POST",
        url: appName + "/reports/surveillance/ajax-get-to-weeks",
        data: {from_month_id: $('#from_month_sel').val()},
        dataType: 'html',
        success: function (data) {
            $('#month_sel').html(data);
        }
    });
});

 $('#dist_id').change(function() {
            var dist_id = $(this).val();
            $('#loader').show();
            $.ajax({
                type: "POST",
                url: appName + "/reports/inventory-management/prov-2dist",
                data: {dist_sel: dist_id, combo: '4'},
                dataType: 'html',
                success: function(data)
                {
                    /*$('#hidden_dist').val(dist_id);
                     $('#hidden_teh').val($('#teh_id').val());*/
                    $('#loader').hide();
                    $('#teh_id').html(data);
                }
            });
            $.ajax({
                type: "POST", url: appName + "/reports/inventory-management/prov-2dist",
                data: {dist_sel: dist_id, combo: '5'},
                dataType: 'html',
                success: function(data)
                {
                    $('#loader').hide();
                    $('#uc_id').html(data);
                }
            });
        });

        $('#teh_id').change(function() {
            var teh_id = $(this).val();
            $('#loader').show();
            $.ajax({
                type: "POST",
                url: appName + "/reports/inventory-management/prov-2dist",
                data: {teh_sel: teh_id, combo: '5'},
                dataType: 'html',
                success: function(data)
                {
                    /*$('#hidden_dist').val(dist_id);
                     $('#hidden_teh').val($('#teh_id').val());*/
                    $('#loader').hide();
                    $('#uc_id').html(data);
                }
            });
        });
$(function () {

    if (whType) {
        officeType(whType);
        showProv(whType);
        showDistricts(province);
        showTehsils(district);
    }

    $('#wh_type').change(function () {

        var whType = $(this).val();
        officeType(whType);
    });
    $('#province').change(function () {
        var provId = $(this).val();
        if (provId != 'all')
        {
            showDistricts(provId);
        } else
        {
            $('#district_combo').fadeOut();
            $('#district').empty();
            $('#tehsil_combo').fadeOut();
            $('#tehsil').empty();
        }
    });
    $('#district').change(function () {
        var distId = $(this).val();
        if (distId != 'all')
        {
            showTehsils(distId);
        }
    });
});
function officeType(whType)
{
    if (whType == 1)
    {
        $('#province_combo').fadeOut();
        $('#province').empty();
        $('#district_combo').fadeOut();
        $('#district').empty();
        $('#tehsil_combo').fadeOut();
        $('#tehsil').empty();
    } else
    {
        if (whType == 2)
        {
            $('#district_combo').fadeOut();
            $('#district').empty();
            $('#tehsil_combo').fadeOut();
            $('#tehsil').empty();
        } else if (whType == 4)
        {
            $('#district_combo').fadeOut();
            $('#district').empty();
            $('#tehsil_combo').fadeOut();
            $('#tehsil').empty();
        } else if (whType == 5)
        {
            $('#province_combo').fadeIn();
            $('#district_combo').fadeOut();
            $('#tehsil_combo').fadeIn();
            $('#district').empty();
        }
        showProv(whType);
    }
}
function showProv(whType)
{

    if (whType != 1)
    {
        $('#province_combo').fadeIn();
        $('#province').html('<option value="">Loading...</option>');
        $.ajax({
            type: "POST",
            url: appName + "/reports/inventory-management/ajax-combos",
            data: {SkOfcLvl: whType, provSelId: province, report: 'sindh'},
            dataType: 'html',
            success: function (data)
            {
                $('#province').html(data);
                var selProv = $('#province').val();
                if (selProv != 'all')
                {
                    showDistricts(selProv);
                }
            }
        });
    }
}
function showDistricts(provId)
{
    var whType = $('#wh_type').val();
    if (whType == 4 || whType == 5)
    {
        $('#district_combo').fadeIn();
        $('#district').html('<option value="">Loading...</option>');
        $.ajax({
            type: "POST",
            url: appName + "/reports/inventory-management/ajax-combos",
            data: {SkOfcLvl: whType, provId: provId, distSelId: district, report: 'rep'},
            dataType: 'html',
            success: function (data)
            {
                $('#district').html(data);
                var selDistrict = $('#district').val();
                showTehsils(selDistrict);
            }
        });
    }
}
function showTehsils(distId)
{
    var whType = $('#wh_type').val();
    if (whType == 5)
    {
        $('#tehsil_combo').fadeIn();
        $('#tehsil').html('<option value="">Loading...</option>');
        $.ajax({
            type: "POST",
            url: appName + "/reports/inventory-management/ajax-combos",
            data: {SkOfcLvl: whType, distId: distId, tehSelId: tehsil, report: 'rep'},
            dataType: 'html',
            success: function (data)
            {
                $('#tehsil').html(data);
            }
        });
    }
}

  