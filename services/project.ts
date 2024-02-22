
const getProjects = async (supabase: any, projectId: string) => {

    let { data: Project, error } = await supabase
        .from('Project').select('*').eq('id', projectId)

        if (error) {
            throw new Error(error)
        }

    return Project

    }
