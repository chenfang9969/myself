
  // 获取待审核投稿列表
  const fetchPendingSubmissions = async () => {
    try {
      const response = await api.get("/admin/submissions");
      setSubmissions(response.data.submissions);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // 处理 403 错误
        console.error("权限不足或认证信息无效:", err);
        alert("权限不足或认证信息无效，请检查您的登录状态");
      } else {
        console.error("加载失败:", err);
        alert("加载审核列表失败");
      }
    } finally {
      setLoading(false);
    }
  };
