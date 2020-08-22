// 定义一些常量
// 每页展示的教师数
const TEACHER_PER_PAGE = 15;
const STUDENT_PER_PAGE = 15;

// 入口函数
$(function () {
    // 获取第一页数据
    refreshTeachers(1, TEACHER_PER_PAGE);


});




// 刷新教师用户表格
function refreshTeachers(page, num) {
    let url = 'http://123.56.156.212/Interface/teacher/allteacher';
    let param = {
        page: page,
        num: num
    }

    // let success = (e) => {
    //     console.log('成功');
    //     console.log(e);
    // };

    let error = (e) => {
        console.log('失败');
    };

    setTimeout(() => {
        jQuery.ajax({
            type: "POST",
            url: url,
            data: param,
            traditional: true,
            timeout: 5000,
            success: renderTeacherTable,
            error: error
        });
    }, 500);



}

// 渲染教师用户表格
function renderTeacherTable(obj) {
    console.log(obj);
    // 判断有没有数据
    if (obj.code === 401) {
        console.log('没有数据');
        return;
    }

    // 处理数据
    let teacherTable = $('#teacherTable');
    let html = '';
    let tno, name, sex, email;

    obj.data.forEach((item) => {
        tno = item.tno;
        name = item.name;
        sex = '男'
        if (item.sex === 'f') {
            sex = '女';
        }
        email = item.email;

        html += `
        <tr>
            <td>
                <input type="checkbox" />
                {0}
            </td>
            <td>{1}</td>
            <td>{2}</td>
            <td>{3}</td>
            <td>OK</td>
            <td class="options">
                <span tno="{0}" class="reset-user">重置</span>
                <span tno="{0}" class="delete-user">删除</span>
            </td>
        </tr>
        `.format(tno, name, sex, email);
    });

    // 添加上最后一行

    html += `
    <tr class="add-user-tr">
        <td><input type="text" placeholder="工号（9位）"></td>
        <td><input type="text" placeholder="姓名"></td>
        <td><input type="text" placeholder="性别（男/女）"></td>
        <td><input type="text" placeholder="邮箱"></td>
        <td>OK</td>
        <td class="options">
            <span class="add-user">添加教师</span>
        </td>
    </tr>    
    `;
    teacherTable.html(html);

    // 每次请求完成后，添加对应的事件
    loadEvents();
}

// 事件
function loadEvents() {


    // 点击左侧切换
    {
        // 左侧按钮
        let change2User = $('#change2User');
        let change2Course = $('#change2Course');
        // 面板
        let userPanel = $('#userPanel');
        let coursePanel = $('#coursePanel');
        change2User.click(() => {

            setClass(change2Course, 'inactive', 'active');
            setClass(change2User, 'active', 'inactive');
            userPanel.css('display', 'block');
            coursePanel.css('display', 'none');
        });

        change2Course.click(() => {
            setClass(change2User, 'inactive', 'active');
            setClass(change2Course, 'active', 'inactive');
            userPanel.css('display', 'none');
            coursePanel.css('display', 'block');
        });
    }


    // 用户管理界面 切换教师/学生
    {
        let cg2Teacher = $('#cg2Teacher');
        let cg2Student = $('#cg2Student');
        let teacher = $('.teacher');
        let student = $('.student');

        cg2Teacher.click(() => {
            student.hide(200);
            teacher.show(200);
        });
        cg2Student.click(() => {
            teacher.hide(200);
            student.show(200);
        });
    }


    // 教师用户操作
    {
        // 重置
        $('.reset-user').off('click');
        $('.reset-user').click((e) => {
            let tno = $(e.target).attr('tno');
            console.log('重置 ' + tno);
        });

        // 删除
        $('.delete-user').off('click');
        $('.delete-user').click((e) => {
            let tno = $(e.target).attr('tno');
            console.log('删除 ' + tno);
        });
    }
}
